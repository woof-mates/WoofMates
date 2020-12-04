export function matchEmail(user, match){
    return `<p>Congrats ${match.firstName}, you and ${match.dog.dogName} have a new match! Check them out:</p>
        <ul>
            <li>Owner Name: ${user.firstName} </li>
            <li>Dog Name: ${user.dog.dogName} </li>
            <li>${user.city}, ${user.state} </li>
            <img src=${user.userImage1} />
        </ul>
        <p>Happy matching!! If you have any questions, please reply to this email.</p>
      <p>Thanks,</p>
      <p>The WoofMate Team</p>`;
}
