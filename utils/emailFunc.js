export function matchEmail(user, match){
    return `<p>Congrats ${match.firstName}, you and ${match.dog.dogName} have a new match!
            <a href="https://woof-mates.herokuapp.com/#/chat">Chat with them now!<a/>
        </p>
        <ul>
            <li>Owner Name: ${user.firstName} </li>
            <li>Dog Name: ${user.dog.dogName} </li>
            <li>${user.city}, ${user.state} </li>
            <img src=${user.userImage1} height="400" />
            <img src=${user.dogImage} height="400" />
        </ul>
        <p>Happy matching!! If you have any questions, please reply to this email.</p>
      <p>Thanks,</p>
      <p>The WoofMate Team</p>`;
}
