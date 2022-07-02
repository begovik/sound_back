class UserDto {
    id
    name
    email
    isActivated

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.isActivated = model.is_activated
    }

}

export default UserDto