import { useState, useEffect } from "react";
import CommentForm from "./CommentsForm";
import Comment from "./Comment";
import {
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "./api";
import './comments.css';

const Comments = ({ getCommentsApi, commentsUrl, currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
            deleteCommentApi().then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    };

    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComments(data);
        });
    }, [getCommentsApi]);

    return (
        <div className="comments">
            <h2 className="comments-title">Комментарии</h2>
            <h3 className="comment-form-title">Написать комментарий</h3>
            <CommentForm submitLabel="Отправить" handleSubmit={addComment} />
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        currentUserId={currentUserId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
