const create = async (data) => {
    const resp = await fetch(FIREBASE_URL+"user.json", {
        method: "POST",
        headers: {
            contentType: "application/json"
        },
        body: JSON.stringify(data)
    })
}

const update = async (data) => {
    const resp = await fetch(FIREBASE_URL+"user/user.json", {
        method: "PUT",
        headers: {
            contentType: "application/json"
        },
        body: JSON.stringify(data)
    })
}

const getAll = async () => {
    const reps = await fetch(FIREBASE_URL+"user.json")
    const data = await reps.json();
    return data;
}

const remove = async (id) => {
    const reps = await fetch(FIREBASE_URL+"user/"+id+"/.json", {
        method: "DELETE"
    })
    const data = await reps
}

const getById = async(id) => {
    const reps = await fetch(FIREBASE_URL+"user/"+id+'/.json')
    const data = await reps.json();
    return data;
}