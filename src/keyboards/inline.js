import { callbacks } from "../config/callbacks.js";
import config from "../config/config.js";


// кнопки для прода
export const checkIsInGroup = [
  [
    { text: "🔗 Вступить", url: config.GROUP_LINK },
    {
      text: "🤖 Проверить",
      callback_data: callbacks.check_group
    }
  ]
]

export const startGreeting = [
  [
    { text: "🍰 Поехали!", callback_data: callbacks.get_greeting }
  ]
]

export const getCourseInfoKeyboard = [
  [
    {
      text: '🧠 Узнать больше',
      callback_data: callbacks.get_course_info
    }
  ]
]

export const nextStepKeyboard = (text) => [
  [
    {
      text,
      callback_data: callbacks.next_step,
    },
  ],
];

export const startTestKeyboard = [
  [
    {
      text: "✏️ Начать тест",
      callback_data: callbacks.start_test
    }
  ]
]

export const approveDeclineKeyboard = (telegramId) => [
  [
    {
      text: '✅ Утвердить',
      callback_data: `approve_${telegramId}`
    },

    {
      text: '❌ Отклонить',
      callback_data: `reject_${telegramId}`
    }
  ]
]

export const startLessonKeyboard = [
  [
    {
      text: "Начать урок",
      callback_data: callbacks.start_lesson
    }
  ]
]

export const getRedwardKeyboard = [
  [
    {
      text: '🎁 Получить подарок',
      callback_data: callbacks.receive_gift
    }
  ]
]

export const showPsychoLessonsKeyboard = [
  [
    {
      text: "🧠 Показать",
      callback_data: callbacks.get_psycho_lessons
    }
  ]
]

// кнопки для остальных нужд
export const startCommandKeyboard = [
  [
    {
      text: 'Нажми меня',
      callback_data: callbacks.start_sequence
    }
  ]
];












