const addFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#add-form').addEventListener('submit', addFormHandler);