import { voices } from "./voices.js";
import { getCourseInfoKeyboard, startLessonKeyboard, startTestKeyboard } from "../keyboards/inline.js";
import { lessonPreDescription } from "./messages.js";
import { videos } from "./videos.js";


//TODO:
// поменять структуру обьекта в остальных последовательностях по примеру последовательности "test"
// поменять последовательность test на greeting (вернуть последовательность как было крч)
// закончить последовательность course_info

export const sequences = {
  test: {
    body: [
      {
        messageArr: ['👋 Привет! Это тестовая последовательность.', 'Надеюсь, что она сработает.'],
        nextStepText: "Next step 1",
        nextStepBtnText: "btn1"
      },
      {
        messageArr: ['🎥 Посмотри это видео-кружок:', { type: 'video_note', file_id: 'DQACAgIAAxkBAAOKZ5wM9amJNGPAXkXzUxgpvHbV3UQAAgNkAAJJFphIs6kooN0CNEI2BA' }],
        nextStepText: "Next step 2",
        nextStepBtnText: "btn2"
      },
      {
        messageArr: ['✅ Это последнее сообщение в последовательности! 🎉'],
        nextStepText: null,
        nextStepBtnText: null
      }
    ],
    endMessage: [
      "Предложение о прохождении пробного урока. Нажмите кнопку ниже чтобы начать.",
      {
        reply_markup: {
          inline_keyboard: startLessonKeyboard
        }
      }
    ]
  },

  greeting: {
    body: [
      // ПРИВЕТСТВИЕ
      {
        messageArr: [
          {
            text: `Приветствую вас, дорогие друзья и коллеги, на канале предобучения школы <b>Yasirova School.</b> 🌸🌸🌸\n\nМеня зовут Анна Ясирова.\nЯ шеф-кондитер с 30 летним кондитерским стажем, из них 12 лет, шефом собственного производства.\n\nМоя миссия через кондитерское искусство сделать этот мир чуть добрее, и научить вас зарабатывать деньги с помощью этой прекрасной профессии.`, parse_mode: "HTML"
          },
          { type: "video_note", file_id: videos.initialMeeting },
          { type: "video_note", file_id: videos.initialMeeting2 },
          { type: "video_note", file_id: videos.initialMeeting3 }
        ],
        nextStepText: "Чтобы узнать больше, нажмите на кнопку ниже 👇",
        nextStepBtnText: "📔 Узнать больше"
      },
      // КРАТКАЯ ИНФА О КУРСЕ
      {
        // "📽️ Вместо длинного и скучного текста, предлагаю вам посмотреть короткое видео про наш курс:", { type: "video", file_id: videos.overallCourseInfo },
        messageArr: [{ type: "video_note", file_id: videos.aboutTest }],
        nextStepText: null,
        nextStepBtnText: null
      }
    ],
    // ПРЕДЛАГАЕМ ПРОЙТИ ТЕСТ
    endMessage: [
      // ПРЕДЛОЖЕНИЕ ПРОЙТИ ТЕСТ ОТ ПСИХОЛОГА
      `🧪 Настало время пройти короткий тест "Какой ты кондитер"!\n\nТест поможет определить:\nКак вам, начинающему кондитеру, лучше развиваться и продвигать свои изделия.`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: startTestKeyboard
        }
      }
    ]
  },

  course_info: {
    body: [
      // ИНФА О ПСИХОЛОГЕ
      {
        messageArr: [
          "Привет, я практический психолог Марина Светлакова.\n\nЯ помогаю с самооценкой, с поиском ценности, со страхом  быть на виду, заявлять о себе, в том числе и в соцсетях, если есть чувство безысходности, если вы чувствуете «у меня не получится, я бессильный, я не могу, не умею», если есть хроническая усталость и ощущение, что вы не управляете своей жизнью, временем и деньгами.",
          { type: "video_note", file_id: videos.meetExpertPsycho1 },
          { type: "video_note", file_id: videos.meetExpertPsycho2 },
          { type: "video_note", file_id: videos.meetExpertPsycho3 },
        ],
        // УЗНАТЬ ИНФУ О ТАРГЕТОЛОГЕ
        nextStepText: "👩‍🔬 Далее",
        nextStepBtnText: "🔽"
      },
      // ИНФА О ТАРГЕТОЛОГЕ
      {
        messageArr: [
          "Специалист по таргетированной рекламе и продвижению в медиа, Юлия Гермацкая.",
          { type: "video", file_id: videos.meetExpertTarget }
        ],
        // УЗНАТЬ ИНФУ О МАСТЕРЕ ПО ФИГУРКАМ
        nextStepText: "👩‍🔬 Далее",
        nextStepBtnText: "🔽"
      },
      // ИНФА О МАСТЕРЕ ПО ФИГУРКАМ
      {
        messageArr: [
          "Меня зовут Наталия Гордеева, я профессиональный мастер по созданию съедобных фигурок из мастики с опытом работы  5 лет.\n\nС 2023 года я активно принимаю участие в международных кондитерских конкурсах, где мои работы были награждены золотыми и серебряными наградами в таких странах, как Англия, Германия, Польша и Италия.\n\nМоя цель – вдохновлять других красотой, помогать новичкам раскрывать свои таланты и создавать изделия, которые приносят радость и восхищение.",
          { type: "video", file_id: videos.meetExpertFigures1 },
          { type: "video", file_id: videos.meetExpertFigures2 }
        ],
        // ПРОБНЫЙ УРОК
        nextStepText: "Предлагаю вам попробовать себя в деле и пройти пробный урок! Нажмите кнопку ниже, чтобы узнать всю нужную информацию для начала урока.",
        nextStepBtnText: "🎂 Узнать больше"
      },
      // РАССКАЗЫВАЕМ ПРО ПРОБНЫЙ УРОК
      {
        messageArr: [
          { type: "video_note", file_id: videos.testLessonNote1 },
          { type: "video_note", file_id: videos.testLessonNote2 }
        ]
      }
    ],
    // ПРЕДЛОЖЕНИЕ ПРОЙТИ ПРОБНЫЙ УРОК
    endMessage: [
      lessonPreDescription,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: startLessonKeyboard
        }
      }
    ]
  },

  psycho_lessons: {
    body: [
      {
        messageArr: ["1. Безопасность", { type: "video", file_id: videos.psychoLesson1 }],
        nextStepText: "Следующий урок",
        nextStepBtnText: "🔽",
      },

      {
        messageArr: ["2. Скорость", { type: "video", file_id: videos.psychoLesson2 }],
        nextStepText: "Следующий урок",
        nextStepBtnText: "🔽",
      },

      // {
      //   messageArr: ["3. Потребность во внимании", { type: "video", file_id: videos.psychoLesson3 }],
      //   nextStepText: "Следующий урок",
      //   nextStepBtnText: "🔽",
      // },

      // {
      //   messageArr: ["4. Потребность в любви", { type: "video", file_id: videos.psychoLesson4 }],
      //   nextStepText: "Следующий урок",
      //   nextStepBtnText: "🔽",
      // },

      {
        messageArr: [
          "5. Организация своего времени",
          { type: "voice", file_id: voices.psychoLesson },
        ],
        nextStepText: "Вы прошли все уроки от нашего психолога.",
        nextStepBtnText: "Далее"
      },

      {
        messageArr: [
          { type: "video_note", file_id: videos.ending1 },
          { type: "video_note", file_id: videos.ending2 }
        ]
      }
    ],

    endMessage: [
      "РЕКЛАМА ПОКУПКИ КУРСА"
    ]
  }
};