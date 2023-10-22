const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('textarea[name="comment-text"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ postId, comment }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);