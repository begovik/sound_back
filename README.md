## Первое, нужно установить зависимости:

Бэкэнд от фронта отдельно (бекенд - папка **server**, фронт - **client**), и у каждого свои зависимости,
соответственно в консоли переходим в папку **server** и выполняем **npm install**

**!!! С папкой client вообще пока не ясно, где она будет, некоторые пишут, что её лучше хранить отдельно,
чтобы бекенд с фронтом не пересекались, плюс на локалке я установил на фронт React, а у него свой репозиторий, и он не заливается в общий,
может придётся делать два, так что строку ниже пока игнорируй !!!**

То-же самое в папке **client**: **npm install** (*На данный момент фронта нет, пропускаем этот шаг*)

Зависимости установлены.

## Дальше работаем впапке server
### Миграциями создаём базу данных и таблицы.

С базой работает **ORM sequelize** и за миграции отвечает dev-пакет **sequelize-cli**

Для работы с базой есть три режима, которые хранятся в файле *C:/ndserv/sound/server/config/config.json*,
а за то, какой режим активен овечает переменная файла **.env** - *NODE_ENV*.

Для создания базы выполняем: **npx sequelize-cli db:create**

При создании таблиц, ORM ругается на режим ES (module), поэтому на время выполнения миграций переключаем режим на **commonjs**,
в файле *server/package.json* заменяем **module** на **commonjs**
и выполняем **npx sequelize-cli db:migrate**. 
Таблицы созданы, меняем режим обратно.

Всё, теперь бекенд готов для работы.


В папке **routes** есть три типа путей:
1. пути для регистрации, проверки почты, логина и логаута **LoginRoutes.js**
2. пути работы с пользователями, **UserRoutes.js**
3. пути для постов, **PostRoutes.js** - создавал их первыми, пока тренировался и их можно будет использовать в проекте (либо как есть, если не раздражает название **post**, либо переименовать)

Дальше логика такая:
	роуты указывают на соответствующие контроллеры, каждый роут на определённый метод контроллера,
	а каждый метод контроллера указывает на соответствующий сервис (папка **server/services**) и на его определённый метод,
	который при необходимости подключает модели таблиц (папка **server/models**).


Обработчик ошибок в папке **server/exceptions**

В папке **dtos** *(Data Transfer Objects)* лежат классы (пока только один), которые "обезвреживают" данные, получаемые из таблиц (отфильтровывают только нужные поля записей)

В папке **static** хранятся статичные файлы

Файлы папки *server/config*:
1. **config.json** - упоминал его выше
2. **sequelizedb.js** - настройки подключения к БД для ORM (работающие в приложении)
3. **db.js** - настройки подключения к БД для прямых запросов (в приложении не работает, оставил для примера)
