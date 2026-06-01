# Публикация Golden WOK через GitHub Pages

## Самый простой способ

1. Откройте https://github.com/new
2. Создайте новый публичный репозиторий, например `golden-wok-app`.
3. Откройте созданный репозиторий.
4. Нажмите `Add file` -> `Upload files`.
5. Перетащите в GitHub все файлы и папки из этой папки:
   `outputs/nori-app`
6. Нажмите `Commit changes`.
7. Откройте `Settings` -> `Pages`.
8. В блоке `Build and deployment` выберите:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
9. Нажмите `Save`.

Через 1-3 минуты GitHub покажет ссылку вида:

`https://ВАШ_ЛОГИН.github.io/golden-wok-app/`

Эту ссылку можно открыть на телефоне.

## Что загружать

Нужно загрузить содержимое папки `nori-app`, а не саму папку целиком:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `sw.js`
- `.nojekyll`
- папку `assets`
- папку `icons`

Файлы `start-mobile-server.cmd` и этот `GITHUB_PAGES.md` загружать необязательно, но можно.
