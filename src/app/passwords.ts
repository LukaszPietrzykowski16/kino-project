// mock of password funcionality

function getPassword(){

    interface password {
        admin: String,
        user: String
    }
    const passwords = {
        admin: 'passwordAdmin',
        user: 'passwordUser'
    }
    return passwords
}

export default getPassword