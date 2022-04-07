const deleteText = document.querySelectorAll('.bin')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})

async function deleteTask(){
    const taskName = this.parentNode.childNodes[1]
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskNameS': taskName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}