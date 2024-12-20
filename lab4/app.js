const API_URL = "http://localhost:3000/users"; // Адрес JSON-Server
const userTable = document.getElementById("userTable");
const userForm = document.getElementById("userForm");

// Функция для загрузки данных с сервера
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error(error.message);
    }
}

// Функция для отрисовки данных в таблице
function renderUsers(users) {
    // Очищаем таблицу перед добавлением новых данных
    userTable.innerHTML = `
        <div class="header">Имя</div>
        <div class="header">Email</div>
        <div class="header">Возраст</div>
        
    `;
    // Добавляем строки для каждого пользователя
    users.forEach(user => {
        userTable.innerHTML += `
            <div>${user.name}</div>
            <div>${user.email}</div>
            <div>${user.age}</div>
            
        `;
    });
}

// Функция для добавления нового пользователя
async function addUser(user) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error("Ошибка добавления пользователя");
        loadUsers(); // Перезагружаем таблицу
    } catch (error) {
        console.error(error.message);
    }
}



// Обработчик отправки формы
userForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Считываем данные из формы
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    // Создаем объект пользователя
    const newUser = { name, email, age };

    // Отправляем данные на сервер
    addUser(newUser);

    // Очищаем форму
    userForm.reset();
});

// Загружаем пользователей при загрузке страницы
loadUsers();
