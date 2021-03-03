export const changePasswordEmail = (token: string) =>
  `<h1>AV Market jelszó emlékeztető</h1>
<p>A linkre kattintva megtudja változtatni jelszavát</p>
<a href="http://localhost:3000/change-password/${token}">Kattintson ide</a>
<br>
<p>Üdvözlettel: AV Market csapata</p>
`;
