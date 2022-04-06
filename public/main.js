const deleteText = document.querySelectorAll('.binIcon')
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})

