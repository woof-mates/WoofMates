export function matchEmail(user, match){
    return `<p>Congrats ${match.firstName}, you and ${match.dog.dogName} have matched with ${user.firstName} and ${user.dog.dogName}!</p>`
}
