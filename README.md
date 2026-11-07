# Список задач

HTML + SCSS + JavaScript, вёрстка по БЭМ. Задачи хранятся в `localStorage`.

## Запуск
Откройте `index.html` в браузере — готовый CSS уже лежит в `css/style.css`.

## Работа со стилями
Стили пишутся в `scss/`, а `css/style.css` собирается из них:

```bash
npm install       # один раз
npm run build     # собрать css/style.css
npm run watch     # пересобирать при каждом сохранении
```

## Структура
```
index.html
app.js
css/style.css            — собранный CSS (не редактировать вручную)
scss/
  style.scss             — точка входа
  _variables.scss        — цвета тем, радиусы, отступы
  _mixins.scss           — миксины
  _base.scss             — CSS-переменные темы, общий сброс
  blocks/                — по файлу на БЭМ-блок
    _page.scss
    _todo.scss
    _todo-form.scss
    _todo-item.scss
```
