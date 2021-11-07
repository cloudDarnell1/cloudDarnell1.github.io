const tbody = document.querySelector('tbody')
const username = document.querySelector('input[name=username]')
const password = document.querySelector('input[name=password]')
const button = document.querySelector('#btn-submit')
const spinner = document.querySelector('.spinner')
const table =  document.querySelector('table')

let CURRENT_METHOD = "POST"

const render = async () => {
    const data = await getAll();
    if (data === null) {
        tbody.innerHTML = `<tr style='text-align: center'><td colspan='3'>${NOTHING_IN_TABLE}</td></tr>`
        spinner.style.display = 'none'
        return
    }

    let str = '';
    for (let key in data) {
        const obj = data[key];
        str += `<tr>
            <td scope="row">${obj.username}</td>
            <td scope="row">${obj.password}</td>
            <td scope="row"><button data-id=${key} class="btn btn-danger btn-delete">remove</button></td>
            <td scope="row"><button data-id=${key} class="btn btn-primary btn-update">update</button></td>
        </tr>`
    }

    
    tbody.innerHTML = str
    
    spinner.style.display = 'none'
    const buttons = document.querySelectorAll('.btn-delete')

    buttons.forEach(button => {
        button.addEventListener('click', async function(e) {
            spinner.style.display = 'block'
            await remove(e.target.dataset.id)
            render()
            spinner.style.display = 'none'
        })
    })

    const updates = document.querySelectorAll('.btn-update')

    updates.forEach(update => {
        update.addEventListener('click', async function(e) {
            spinner.style.display = 'block'
            const data = await getById(e.target.dataset.id)
            username.value = data.username
            password.value = data.password
            spinner.style.display = 'none'
        })
    })
}

render()

button.addEventListener('click', async (e) => {
    spinner.style.display = 'block'
    const obj = {
        username: username.value,
        password: password.value
    }

    if (CURRENT_METHOD === 'POST') {
        const a = await create(obj)
    } else if (CURRENT_METHOD === "PUT") {
    }
    render()
    reset()
    spinner.style.display = 'none'
})


const reset = () => {
    username.value = ''
    password.value = ''
}
