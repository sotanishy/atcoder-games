# AtCoder Games

AtCoder Gamesは、AtCoderの問題に登場するゲームを遊べるサイトです。

AtCoder Games is a website where users can play games in AtCoder problems.

[https://atcoder-games.herokuapp.com/games](https://atcoder-games.herokuapp.com/games)


## Installation Instructions

1. Clone this repository

```
git clone https://github.com/sotanishy/atcoder-games.git
cd atcoder-games
```

2. Install dependencies

```
pip install -r requirements.txt
```

3. Create a superuser

```
python manage.py createsuperuser
```

Type in whatever username and password you want to use on your local computer.

4. Migrate

```
python manage.py makemigrations
python manage.py migrate
```

5. Run the application

```
python manage.py runserver
```
