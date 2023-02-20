import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'Return home': 'Return home',
          'Details': 'Details',
          'Products': 'Products',
          'PProducts': 'Premium products',
          'Profile': 'Profile',
          'Log out': 'Log out',
          'Sign in': 'Sign in',
          'Sign up': 'Sign up',
          'Language': 'Language',
          'Loading': 'Loading',
          'Email address': 'Email address',
          'ErorrEmail': 'Invalid e-mail',
          'ErrorPassword': 'Min length is 8 symbols. Password must contain atleast one digit, one capital and one small letter, a special symbol and no whitespaces',
          'Password': 'Password',
          'Close': 'Close',
          'Login': 'Login',
        }
      },
      ru: {
        translation: {
          'Return home': 'На главную',
          'Details': 'Подробнее',
          'Products': 'Продукты',
          'PProducts': 'Премиум продукты',
          'Profile': 'Профиль',
          'Log out': 'Выйти',
          'Sign in': 'Вход',
          'Sign up': 'Регистрация',
          'Language': 'Язык',
          'Loading': 'Загрузка',
          'Email address': 'Электронная почта',
          'ErorrEmail': 'Некорректная почта',
          'ErrorPassword': 'Пароль должен содержать минимум 8 символов, одну цифру, одну заглавную и одную строчную буквы и не содержать пробелы',
          'Password': 'Пароль',
          'Close': 'Закрыть',
          'Login': 'Вход',
        }
      }
    },
  });