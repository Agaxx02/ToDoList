const deleteText = document.querySelectorAll('.bin')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTask)
})

Array.from(item).forEach((element) => {
    element.addEventListener('click', markComplete)
})
Array.from(itemCompleted).forEach((element) => {
    element.addEventListener('click', markUncomplete)
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

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemCompleted': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
       console.error(err) 
    }
}
async function markUncomplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemNotCompleted': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.error(err)
    }
}