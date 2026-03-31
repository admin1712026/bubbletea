# Supabase Setup Instructions

## Шаг 1: Настройка переменных окружения
Переменные в файле `.env.local` уже установлены:
```
NEXT_PUBLIC_SUPABASE_URL=https://luukovzdyaxilhhuwxou.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zC9d1XXN765vWjJcX35u_g_1Qcux5xT
```

## Шаг 2: Создание таблицы в Supabase

1. Откройте [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **SQL Editor**
4. Создайте новый query
5. Скопируйте содержимое из файла `supabase_setup.sql` и выполните

Это создаст таблицу `users` с примерными данными.

## Шаг 3: Запуск приложения

```bash
# Установить зависимости (если еще не установлены)
npm install

# Запустить dev сервер
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## Шаг 4: Проверка подключения

Откройте http://localhost:3000 в браузере. Вы должны увидеть:
- Статус подключения к Supabase
- Список пользователей из таблицы (если таблица создана)
- Информацию об окружении

## Часто встречающиеся ошибки

### "Table "users" not found"
Решение: Выполните SQL запрос из `supabase_setup.sql` в Supabase SQL Editor

### "Supabase URL or Anon Key is missing"
Решение: Проверьте что в `.env.local` установлены beide переменные

### "CORS error"
Решение: Проверьте в Supabase Settings → Authentication что localhost:3000 добавлен в список разрешенных URL

## Structure

```
app/page.tsx          - Главная страница (клиентский компонент)
lib/supabase.ts       - Конфиг Supabase (устаревший, используется page.tsx)
.env.local            - Переменные окружения
supabase_setup.sql    - SQL для создания таблиц
```

## Tips

- Если dev сервер запущен, изменения в коде применяются автоматически
- Для развертывания используйте `npm run build` и `npm run start`
- Для линтинга используйте `npm run lint`
