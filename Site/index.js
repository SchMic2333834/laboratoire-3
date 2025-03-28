// Fonctions pour la page principale
async function fetchCards() {
    try{
        const response = await fetch('http://localhost:3000/cards');
        const cardsData = await response.json();
        const cardsContainer = document.getElementById("cards");
        cardsContainer.innerHTML = "";

        for (let i = 0; i < cardsData.length; i++) {
            cardsContainer.innerHTML += `
            <div class="col mb-4">
                <div class="card h-100 mx-2">
                    <a class="nav-link" href="blog_post.html?id=${cardsData[i].id}">
                        <img src="${cardsData[i].image}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${cardsData[i].title}</h5>
                            <p class="card-text">
                                ${cardsData[i].description}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
          `;
        }
    } catch (error) {
        console.error(error);
    }
}
// Fonction pour afficher la publication
async function fetchBlogPost() {
    try {
        const params = new URLSearchParams(window.location.search);
        const cardId = params.get('id');

        const response = await fetch('http://localhost:3000/cards');
        const cardsData = await response.json();

        const card = cardsData.find(card => card.id == cardId); 

        if (card) { 
            document.getElementById("blogPost").innerHTML = `
                <h1>${card.title}</h1>
                ${card.content}
            `;
            renderComments(); 
        } else {
            console.error(`Card with ID ${cardId} not found.`);
            document.getElementById("blogPost").innerHTML = `
            <h1>Card not found</h1>
            <p>The card you are looking for does not exist</p>
        `;
        }
    } catch (error) {
        console.error(error);
    }
}

function toggleReplyForm(button) {
    const cardContainer = button.closest('.card');
    const replyForm = cardContainer.querySelector('.reply-form-container');
    replyForm.classList.toggle('d-none');

    if (!replyForm.classList.contains('d-none')) {
        replyForm.querySelector('textarea').focus();
    }
}

// Fonction pour afficher les commentaires
async function renderComments() {
    try {
        const params = new URLSearchParams(window.location.search);
        const currentCardId = params.get('id');

        const response = await fetch('http://localhost:3000/comments');
        const commentsData = await response.json();
        const commentContainer = document.getElementById('comments');
        commentContainer.innerHTML = ''; 

        const groupedComments = {};

        // On filtre les commentaires pour n'afficher que ceux de la carte actuelle
        const filteredComments = commentsData.filter(comment => comment.cardId == currentCardId);
        
        for (let index = 0; index < filteredComments.length; index++) {
          const comment = filteredComments[index];
          const parentId = comment.parentId;

          if (!parentId) {
              if (!groupedComments['null']) {
                  groupedComments['null'] = [];
              }
              groupedComments['null'].push(comment);
          } else {
              if (!groupedComments[parentId]) {
                  groupedComments[parentId] = [];
              }
              groupedComments[parentId].push(comment);
          }
        }

        // Affichage des commentaires et des reponses
        if (groupedComments['null']) {
            groupedComments['null'].forEach(parentComment => {
                let parentCommentHTML = `<div class="container-fluid d-flex flex-column my-2 px-0 align-items-end" id="comment-${parentComment.id}">
                    <div class="card d-flex flex-row flex-wrap w-100">
                    <div class="d-flex flex-column w-100">
                        <div class="card-body d-flex flex-row justify-content-center align-items-center">
                            <img src="images/person-circle.svg" class="img-fluid mx-3" alt="">
                            <p class="w-100 text-justify d-flex flex-wrap align-items-center my-1 mx-2">${parentComment.content}</p>
                            <button onclick="toggleReplyForm(this)" class="btn custom-btn mb-3 my-2 ms-2">Répondre</button>
                        </div>
                    <div class="reply-form-container d-none" id="replyForm-${parentComment.id}">
                        <textarea class="form-control mb-2" id="replyInput-${parentComment.id}" name="reply"></textarea>
                        <button onclick="postReply('${parentComment.id}')" class="btn custom-btn">Envoyer</button>
                    </div>
                    </div>
                    </div>
                    <div id="replies-container-${parentComment.id}" class="w-100 d-flex justify-content-end flex-wrap"></div>
                </div>`;
                commentContainer.innerHTML += parentCommentHTML;
                if (groupedComments[parentComment.id]) {
                    let repliesHTML = '';
                    groupedComments[parentComment.id].forEach(replyComment => {
                        repliesHTML += `<div class="card d-flex flex-row justify-content-end my-2 px-0 col-10">
                            <div class="card-body d-flex flex-row">
                                <img src="images/person-circle.svg" class="img-fluid mx-3" alt="">
                                <p class="w-100 text-justify">${replyComment.content}</p>
                            </div>
                        </div>`;
                    });
                    const repliesContainer = document.getElementById(`replies-container-${parentComment.id}`);
                    if (repliesContainer) { 
                        repliesContainer.innerHTML = repliesHTML; 
                    }
                }
            });
        }
    }
    catch (error) {
      console.error("Erreur lors du rendu des commentaires", error)
    }

}

// Ajout de l'event listener
document.addEventListener('DOMContentLoaded', function() {
    renderComments();
    
    const submitButton = document.getElementById('submitCommentBtn');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const commentContent = document.getElementById('commentContent').value;
            if (commentContent.trim() !== "") {
                postComment(commentContent);
                document.getElementById('commentContent').value = '';
            } else {
                alert("Veuillez entrer un commentaire avant de soumettre.");
            }
        });
    } else {
        console.error("Le bouton avec l'ID 'submitCommentBtn' n'a pas été trouvé!");
    }
});

// Fonction pour ajouter un nouveau commentaire
function postComment(content, parentId = null) {
    const params = new URLSearchParams(window.location.search);
    const cardId = params.get('id');
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardId: cardId,
            content: content,
            parentId: parentId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderComments();
    })
    .catch(error => console.error(error));
}

// Fonction pour repondre
function postReply(parentCommentId) {
    const replyContent = document.getElementById(`replyInput-${parentCommentId}`).value;

    if (replyContent.trim()) {
        postComment(replyContent, parentCommentId);
    }
}
// Code for add_post.js
$(document).ready(function() {
    //initialisation
    $("#confirmationDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Confirmer": function() {
                submitPost(); 
                $(this).dialog("close");
            },
            "Annuler": function() {
                $(this).dialog("close");
            }
        }
    });

    $("#addPostForm").submit(function(event) {
        event.preventDefault(); 
        $("#confirmationDialog").dialog("open");
    });
});

//fonction pour ajouter une publication
function submitPost() {
    const title = $("#postTitle").val();
    const author = $("#postAuthor").val();
    const description = $("#postDescription").val();
    let content = $("#postContent").val();
    const image = $("#postImage").val();

    content = wrapContentInParagraphs(content);

    const newPost = {
        id: generateId(), 
        title: title,
        author: author,
        description: description,
        content: content,
        image: image,
        date: new Date().toISOString()
    };

    fetch('http://localhost:3000/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "index.html";
        } else {
            throw new Error("Erreur lors de l'ajout du post");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Erreur lors de l'ajout du post. Veuillez réessayer.");
    });
}
//fonction pour ajouter les figures
function insertFigure() {
  const figureImageUrl = $("#figureImage").val();
  const figureCaptionText = $("#figureCaption").val();

  if (figureImageUrl && figureCaptionText) {
      const figureHtml = `
          </p><figure class='figure d-flex justify-content-evenly align-items-center flex-column w-100 my-4'>
              <img src='${figureImageUrl}' class='figure-img img-fluid rounded' alt='A generic square placeholder image with rounded corners in a figure.'>
              <figcaption class='figure-caption'>${figureCaptionText}</figcaption>
          </figure><p>
      `;

      insertAtCursor(document.getElementById("postContent"), figureHtml);

      $("#figureImage").val("");
      $("#figureCaption").val("");
  }
  else if(figureImageUrl){
    const figureHtml = `
          </p><figure class='figure d-flex justify-content-evenly align-items-center flex-column w-100 my-4'>
              <img src='${figureImageUrl}' class='figure-img img-fluid rounded' alt='A generic square placeholder image with rounded corners in a figure.'>
          </figure><p>
      `;

      insertAtCursor(document.getElementById("postContent"), figureHtml);

      $("#figureImage").val("");
      $("#figureCaption").val("");
  }
  else if(figureCaptionText){
    alert("Veuillez entrer une URL d'image valide");
  }
}

function insertAtCursor(myField, myValue) {
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
  } else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
  }
}
//fonction pour wrap le content dans des p, tout en laissant les figures intacts
function wrapContentInParagraphs(content) {
    const lines = content.split('\n');
  
    let processedContent = '';
    let inParagraph = false;
    let inFigure = false;
    for (const line of lines) {
        const trimmedLine = line.trim();
        //check if line is a start of figure
        if (trimmedLine.startsWith('<figure')) {
            if (inParagraph) {
                processedContent += '</p>';
                inParagraph = false;
            }
            processedContent += trimmedLine;
            inFigure = true;
          //check if line is an end of figure
        }else if (trimmedLine.endsWith('</figure>')){
            processedContent += trimmedLine;
            inFigure = false;
        //check if line is an empty line
        }else if(trimmedLine === '' && !inFigure){
            if (inParagraph) {
                processedContent += '</p>';
                inParagraph = false;
            }
             processedContent += '<p class="text-justify"></p>';
        }
        else if (!inFigure && trimmedLine !== ''){
            if (!inParagraph) {
                processedContent += '<p class="text-justify">';
                inParagraph = true;
            }
            processedContent += trimmedLine + ' ';
        }else{
            processedContent += trimmedLine;
        }
    }
    if (inParagraph) {
        processedContent += '</p>';
    }
  
    return processedContent;
  }
