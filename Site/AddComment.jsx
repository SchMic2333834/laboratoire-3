function AddComment({ blogId, onCommentAdded }) {
    const [content, setContent] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            alert("Veuillez entrer un commentaire avant de soumettre.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardId: blogId,
                    content: content,
                    parentId: null
                })
            });

            if (response.ok) {
                setContent('');
                onCommentAdded();
            } else {
                throw new Error('Erreur lors de l\'ajout du commentaire');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert("Erreur lors de l'ajout du commentaire. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-end">
            <textarea 
                className="form-control mb-2"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez votre commentaire..."
            />
            <button 
                type="submit"
                className="btn custom-btn"
            >
                Envoyer
            </button>
        </form>
    );
}