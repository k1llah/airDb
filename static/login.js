if (!localStorage.id || !localStorage.uuid) {
  location.replace("/login.html");
} else {
  // console.log('check')
  checkUser();
}

async function checkUser() {
  const resp = await fetch("/check_user", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: +localStorage.id,
      uuid: localStorage.uuid,
    }),
  });
  const data = await resp.json();
  // console.log(data.data)
  if (!data.data) {
    localStorage.removeItem("id");
    localStorage.removeItem("uuid");
    location.replace("/login.html");
  }
}
const logOutButton = document.querySelector(".log_out");

logOutButton.addEventListener("click", async () => {
  try {
    const resp = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      // Успешный выход пользователя, перенаправляем на страницу входа
      window.location.href = "/login.html";
     // Очистка данных пользователя из localStorage
      localStorage.removeItem("id"); // Удаление идентификатора пользователя
      localStorage.removeItem("uuid"); // Удаление UUID пользователя
    } else {
      // Обработка ошибки при выходе пользователя
      console.error("Ошибка при выходе пользователя");
    }
  } catch (error) {
    console.error("Ошибка при выходе пользователя", error);
  }
});
