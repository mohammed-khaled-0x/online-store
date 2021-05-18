const deleteComment = async (element) => {
    element.onclick = async () => {
        console.log(element)
        console.log(element.parentElement.id);
        await fetch(`https://mystore9.herokuapp.com/products/reviews_update/${element.parentElement.id}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.token}`
            }        
        })
        .then(response => {
            const comment = document.getElementById(`comment_${element.parentElement.id}`);
            comment.parentElement.removeChild(comment);
        })
    }
}

export default deleteComment;