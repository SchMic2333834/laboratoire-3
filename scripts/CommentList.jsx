function CommentList({ blogId }) {
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        fetchComments();
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/comments?cardId=${blogId}`);
            const commentsData = await response.json();
            const filteredComments = commentsData.filter(comment => comment.cardId == blogId);
            setComments(filteredComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    content={comment.content}
                />
            ))}
        </div>
    );
}