"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LanguageKey =
  | "English"
  | "Spanish"
  | "French"
  | "Arabic"
  | "German"
  | "Turkish";

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
};

// English Placement Test data (A1–C1)
const englishQuestions = [
  // A1 (Beginner)
  {
    id: "1",
    level: "A1",
    prompt: "What does “book” mean?",
    choices: [
      { id: "a", label: "a car" },
      { id: "b", label: "a thing you read" },
      { id: "c", label: "a kind of food" },
      { id: "d", label: "a city" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "2",
    level: "A1",
    prompt: "Choose the correct sentence:",
    choices: [
      { id: "a", label: "He go to school." },
      { id: "b", label: "He goes to school." },
      { id: "c", label: "He going to school." },
      { id: "d", label: "He is go school." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "3",
    level: "A1",
    prompt:
      "Anna has two cats. They sleep on her bed. Where do Anna’s cats sleep?",
    choices: [
      { id: "a", label: "in the garden" },
      { id: "b", label: "on her bed" },
      { id: "c", label: "under the table" },
      { id: "d", label: "on the sofa" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "4",
    level: "A1",
    prompt: "Which word is NOT a fruit?",
    choices: [
      { id: "a", label: "apple" },
      { id: "b", label: "banana" },
      { id: "c", label: "rice" },
      { id: "d", label: "orange" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "5",
    level: "A1",
    prompt: "I ___ a student.",
    choices: [
      { id: "a", label: "am" },
      { id: "b", label: "is" },
      { id: "c", label: "are" },
      { id: "d", label: "be" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "6",
    level: "A1",
    prompt: "Tom is tall. His sister is short. Who is short?",
    choices: [
      { id: "a", label: "Tom" },
      { id: "b", label: "Tom’s sister" },
      { id: "c", label: "both" },
      { id: "d", label: "none" },
    ],
    correctChoiceId: "b",
  },
  // A2 (Elementary)
  {
    id: "7",
    level: "A2",
    prompt: "Mary visited her grandparents last weekend. Who did Mary visit?",
    choices: [
      { id: "a", label: "her friends" },
      { id: "b", label: "her grandparents" },
      { id: "c", label: "her teacher" },
      { id: "d", label: "her parents" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "8",
    level: "A2",
    prompt: "He ___ football yesterday.",
    choices: [
      { id: "a", label: "play" },
      { id: "b", label: "plays" },
      { id: "c", label: "played" },
      { id: "d", label: "playing" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "9",
    level: "A2",
    prompt: "The opposite of “cold” is:",
    choices: [
      { id: "a", label: "wet" },
      { id: "b", label: "dry" },
      { id: "c", label: "hot" },
      { id: "d", label: "long" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "10",
    level: "A2",
    prompt: "Choose the correct sentence:",
    choices: [
      { id: "a", label: "She don’t like apples." },
      { id: "b", label: "She doesn’t like apples." },
      { id: "c", label: "She isn’t like apples." },
      { id: "d", label: "She didn’t likes apples." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "11",
    level: "A2",
    prompt: "She put the glass on the ___.",
    choices: [
      { id: "a", label: "table" },
      { id: "b", label: "wall" },
      { id: "c", label: "chair" },
      { id: "d", label: "floor" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "12",
    level: "A2",
    prompt: "The movie started at 7 and finished at 9. How long was the movie?",
    choices: [
      { id: "a", label: "1 hour" },
      { id: "b", label: "2 hours" },
      { id: "c", label: "3 hours" },
      { id: "d", label: "4 hours" },
    ],
    correctChoiceId: "b",
  },
  // B1 (Intermediate)
  {
    id: "13",
    level: "B1",
    prompt: "People recycle to protect the environment. Why do people recycle?",
    choices: [
      { id: "a", label: "to waste time" },
      { id: "b", label: "to protect the environment" },
      { id: "c", label: "to make more plastic" },
      { id: "d", label: "to earn money" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "14",
    level: "B1",
    prompt: "“To get along with someone” means:",
    choices: [
      { id: "a", label: "to argue" },
      { id: "b", label: "to be friendly" },
      { id: "c", label: "to fight" },
      { id: "d", label: "to ignore" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "15",
    level: "B1",
    prompt: "If I ___ more time, I would travel.",
    choices: [
      { id: "a", label: "have" },
      { id: "b", label: "had" },
      { id: "c", label: "will have" },
      { id: "d", label: "would have" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "16",
    level: "B1",
    prompt: "She ___ English since 2020.",
    choices: [
      { id: "a", label: "studies" },
      { id: "b", label: "studied" },
      { id: "c", label: "has studied" },
      { id: "d", label: "is studying" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "17",
    level: "B1",
    prompt: "He made a very ___ decision.",
    choices: [
      { id: "a", label: "careful" },
      { id: "b", label: "rare" },
      { id: "c", label: "tall" },
      { id: "d", label: "soft" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "18",
    level: "B1",
    prompt: "He suggested ___ earlier.",
    choices: [
      { id: "a", label: "to leave" },
      { id: "b", label: "leaving" },
      { id: "c", label: "leave" },
      { id: "d", label: "left" },
    ],
    correctChoiceId: "b",
  },
  // B2 (Upper-Intermediate)
  {
    id: "19",
    level: "B2",
    prompt:
      "Urban gardens help cities by improving air quality and providing food. What is one benefit?",
    choices: [
      { id: "a", label: "more traffic" },
      { id: "b", label: "more pollution" },
      { id: "c", label: "better air" },
      { id: "d", label: "higher prices" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "20",
    level: "B2",
    prompt: "“Resilient” means:",
    choices: [
      { id: "a", label: "strong and flexible" },
      { id: "b", label: "very tired" },
      { id: "c", label: "expensive" },
      { id: "d", label: "sad" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "21",
    level: "B2",
    prompt: "If she ___, she would have come.",
    choices: [
      { id: "a", label: "knew" },
      { id: "b", label: "had known" },
      { id: "c", label: "knows" },
      { id: "d", label: "will know" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "22",
    level: "B2",
    prompt: "He made a ___ decision after long thought.",
    choices: [
      { id: "a", label: "instant" },
      { id: "b", label: "careful" },
      { id: "c", label: "hasty" },
      { id: "d", label: "careless" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "23",
    level: "B2",
    prompt:
      "They will finish the project next week. → Choose the correct passive form.",
    choices: [
      { id: "a", label: "The project finishes next week." },
      { id: "b", label: "The project will finished next week." },
      { id: "c", label: "The project will be finished next week." },
      { id: "d", label: "The project will finish by them." },
    ],
    correctChoiceId: "c",
  },
  {
    id: "24",
    level: "B2",
    prompt:
      "Many people volunteer to help clean beaches. What do volunteers do?",
    choices: [
      { id: "a", label: "pollute" },
      { id: "b", label: "travel" },
      { id: "c", label: "clean beaches" },
      { id: "d", label: "teach English" },
    ],
    correctChoiceId: "c",
  },
  // C1 (Advanced)
  {
    id: "25",
    level: "C1",
    prompt:
      "Advances in renewable energy reduce costs and expand global access. What is a result of these advances?",
    choices: [
      { id: "a", label: "less access" },
      { id: "b", label: "higher cost" },
      { id: "c", label: "wider adoption" },
      { id: "d", label: "lower quality" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "26",
    level: "C1",
    prompt: "Choose the correct formal sentence:",
    choices: [
      { id: "a", label: "People ain’t gonna accept that." },
      { id: "b", label: "People are not going to accept that." },
      { id: "c", label: "People no accept that." },
      { id: "d", label: "People aren’t accepting that never." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "27",
    level: "C1",
    prompt: "“Mitigate” means:",
    choices: [
      { id: "a", label: "increase" },
      { id: "b", label: "remove completely" },
      { id: "c", label: "reduce or lessen" },
      { id: "d", label: "repeat" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "28",
    level: "C1",
    prompt: "Choose the correct sentence:",
    choices: [
      {
        id: "a",
        label: "Neither the manager nor the employees was aware of the news.",
      },
      {
        id: "b",
        label: "Neither the manager nor the employees were aware of the news.",
      },
      { id: "c", label: "Neither the manager or the employees were aware." },
      { id: "d", label: "Neither manager nor employees was aware." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "29",
    level: "C1",
    prompt:
      "Although automation increases efficiency, it may displace workers. What is a disadvantage of automation?",
    choices: [
      { id: "a", label: "it replaces workers" },
      { id: "b", label: "it increases jobs" },
      { id: "c", label: "it lowers productivity" },
      { id: "d", label: "it reduces machines" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "30",
    level: "C1",
    prompt: "The committee reached a ___ decision after hours of debate.",
    choices: [
      { id: "a", label: "lazy" },
      { id: "b", label: "slow" },
      { id: "c", label: "unanimous" },
      { id: "d", label: "angry" },
    ],
    correctChoiceId: "c",
  },
];

const russianQuestions = [
  {
    id: "1",
    level: "A1",
    prompt: "Как вас зовут? — Меня зовут _ .",
    choices: [
      { id: "A", label: "студент" },
      { id: "B", label: "хорошо" },
      { id: "C", label: "Анна" },
      { id: "D", label: "здесь" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "2",
    level: "A1",
    prompt: "Это _? — Да, это стол.",
    choices: [
      { id: "A", label: "окно" },
      { id: "B", label: "стол" },
      { id: "C", label: "дом" },
      { id: "D", label: "книга" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "3",
    level: "A1",
    prompt: "Мама: «Доброе утро, Коля!» Коля: «______»",
    choices: [
      { id: "A", label: "Пока!" },
      { id: "B", label: "До свидания!" },
      { id: "C", label: "Привет, мама!" },
      { id: "D", label: "Как дела?" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "4",
    level: "A1",
    prompt: "У меня есть _ .",
    choices: [
      { id: "A", label: "книга" },
      { id: "B", label: "книгу" },
      { id: "C", label: "книгой" },
      { id: "D", label: "о книге" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "5",
    level: "A1",
    prompt: "Сколько будет 3+2 ? — _",
    choices: [
      { id: "A", label: "Два" },
      { id: "B", label: "Четыре" },
      { id: "C", label: "Пять" },
      { id: "D", label: "Семь" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "6",
    level: "A1",
    prompt: "Я живу в Москве. Я говорю по-русски _ .",
    choices: [
      { id: "A", label: "долго" },
      { id: "B", label: "хорошо" },
      { id: "C", label: "быстро" },
      { id: "D", label: "много" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "7",
    level: "A2",
    prompt: "Моя сестра _ в банке.",
    choices: [
      { id: "A", label: "работаю" },
      { id: "B", label: "работаешь" },
      { id: "C", label: "работает" },
      { id: "D", label: "работаем" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "8",
    level: "A2",
    prompt: "Вчера я купил _ и овощи.",
    choices: [
      { id: "A", label: "фрукты" },
      { id: "B", label: "хлеб" },
      { id: "C", label: "воду" },
      { id: "D", label: "деньги" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "9",
    level: "A2",
    prompt: "Диалог: - Где ты был вчера? - Я был _ .",
    choices: [
      { id: "A", label: "в ресторан" },
      { id: "B", label: "в кино" },
      { id: "C", label: "на работе" },
      { id: "D", label: "из дома" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "10",
    level: "A2",
    prompt: "Мы часто слушаем _ в машине.",
    choices: [
      { id: "A", label: "музыка" },
      { id: "B", label: "музыкой" },
      { id: "C", label: "музыку" },
      { id: "D", label: "о музыке" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "11",
    level: "A2",
    prompt: "_ сегодня очень холодная.",
    choices: [
      { id: "A", label: "Время" },
      { id: "B", label: "Погода" },
      { id: "C", label: "Дождь" },
      { id: "D", label: "Солнце" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "12",
    level: "A2",
    prompt: "Я хочу _ кофе.",
    choices: [
      { id: "A", label: "пить" },
      { id: "B", label: "пью" },
      { id: "C", label: "пьёт" },
      { id: "D", label: "пила" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "13",
    level: "B1",
    prompt: "Вчера он _ на работу на автобусе.",
    choices: [
      { id: "A", label: "едет" },
      { id: "B", label: "ездит" },
      { id: "C", label: "ехал" },
      { id: "D", label: "поехал" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "14",
    level: "B1",
    prompt: "Я люблю дарить подарки _ .",
    choices: [
      { id: "A", label: "друзья" },
      { id: "B", label: "друзей" },
      { id: "C", label: "друзьям" },
      { id: "D", label: "о друзьях" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "15",
    level: "B1",
    prompt: "Она пишет письмо _ .",
    choices: [
      { id: "A", label: "ручка" },
      { id: "B", label: "ручку" },
      { id: "C", label: "ручкой" },
      { id: "D", label: "о ручке" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "16",
    level: "B1",
    prompt: "Мой день рождения _ сентябре.",
    choices: [
      { id: "A", label: "в" },
      { id: "B", label: "на" },
      { id: "C", label: "к" },
      { id: "D", label: "под" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "17",
    level: "B1",
    prompt: "Мне нужна _ с этим заданием.",
    choices: [
      { id: "A", label: "проблема" },
      { id: "B", label: "помощь" },
      { id: "C", label: "работа" },
      { id: "D", label: "мысль" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "18",
    level: "B1",
    prompt:
      "«В этом городе много старинных зданий». کلمه مشخص شده به چه معناست؟",
    choices: [
      { id: "A", label: "больших" },
      { id: "B", label: "новых" },
      { id: "C", label: "красивых" },
      { id: "D", label: "древних" },
    ],
    correctChoiceId: "D",
  },
  {
    id: "19",
    level: "B2",
    prompt: "Я _ ему помочь.",
    choices: [
      { id: "A", label: "обещал" },
      { id: "B", label: "обещаю" },
      { id: "C", label: "пообещал" },
      { id: "D", label: "обещай" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "20",
    level: "B2",
    prompt: "Он принял _ уволиться.",
    choices: [
      { id: "A", label: "вопрос" },
      { id: "B", label: "ответ" },
      { id: "C", label: "решение" },
      { id: "D", label: "предложение" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "21",
    level: "B2",
    prompt:
      "«Он никогда не забывает о своих обещаниях». این عبارت بیانگر چیست؟",
    choices: [
      { id: "A", label: "Он ненадёжный." },
      { id: "B", label: "Он всегда помнит." },
      { id: "C", label: "Он часто забывает." },
      { id: "D", label: "Он лжёт." },
    ],
    correctChoiceId: "B",
  },
  {
    id: "22",
    level: "B2",
    prompt: "_ дождь, мы пошли гулять.",
    choices: [
      { id: "A", label: "Благодаря" },
      { id: "B", label: "Из-за" },
      { id: "C", label: "Несмотря на" },
      { id: "D", label: "Кроме" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "23",
    level: "B2",
    prompt: "Для _ карьеры нужно много работать.",
    choices: [
      { id: "A", label: "хорошей" },
      { id: "B", label: "успешной" },
      { id: "C", label: "трудной" },
      { id: "D", label: "сложной" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "24",
    level: "B2",
    prompt: "«Если бы я знал, я бы _ ». این یک جمله شرطی نوع... است.",
    choices: [
      { id: "A", label: "اول (واقعی)" },
      { id: "B", label: "دوم (غیرواقعی)" },
      { id: "C", label: "سوم (غیرواقعی در گذشته)" },
      { id: "D", label: "صفر (همیشگی)" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "25",
    level: "C1",
    prompt: "Это _ проблем в современном мире.",
    choices: [
      { id: "A", label: "одна из важнейших" },
      { id: "B", label: "одна из самых важных" },
      { id: "C", label: "одна из важнейшее" },
      { id: "D", label: "одну из важнейших" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "26",
    level: "C1",
    prompt: "У них есть _ в отношениях.",
    choices: [
      { id: "A", label: "общее слово" },
      { id: "B", label: "взаимопонимание" },
      { id: "C", label: "обоюдный интерес" },
      { id: "D", label: "коллективное мнение" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "27",
    level: "C1",
    prompt:
      "Феномен глобализации затрагивает все сферы человеческой жизнедеятельности, начиная от экономики и заканчивая культурой. Это процесс, который невозможно остановить, и к которому необходимо адаптироваться.» (کلمه жизнедеятельности به چه معناست؟)",
    choices: [
      { id: "A", label: "Проблемы" },
      { id: "B", label: "Жизнь и активность" },
      { id: "C", label: "Культура" },
      { id: "D", label: "Наука" },
    ],
    correctChoiceId: "B",
  },
  {
    id: "28",
    level: "C1",
    prompt: "Как бы вы ни _ , результат будет одинаковым.",
    choices: [
      { id: "A", label: "старались" },
      { id: "B", label: "стараетесь" },
      { id: "C", label: "стараетесь" },
      { id: "D", label: "стараться" },
    ],
    correctChoiceId: "A",
  },
  {
    id: "29",
    level: "C1",
    prompt: "Этот вопрос требует _ анализа.",
    choices: [
      { id: "A", label: "быстрого" },
      { id: "B", label: "поверхностного" },
      { id: "C", label: "глубокого" },
      { id: "D", label: "дружеского" },
    ],
    correctChoiceId: "C",
  },
  {
    id: "30",
    level: "C1",
    prompt:
      "«Специалисты считают, что необходимо в корне пересмотреть текущую стратегию». (عبارت в корне در اینجا به چه معناست؟)",
    choices: [
      { id: "A", label: "В начале" },
      { id: "B", label: "Полностью, радикально" },
      { id: "C", label: "На поверхности" },
      { id: "D", label: "Частично" },
    ],
    correctChoiceId: "B",
  },
];

// Modified question bank generator
function generateQuestionBank(language: LanguageKey): Question[] {
  if (language === "English") {
    return englishQuestions.map(({ id, prompt, choices, correctChoiceId }) => ({
      id: "q-" + id,
      prompt,
      choices,
      correctChoiceId,
    }));
  }
  if (language === "Russian") {
    return russianQuestions.map(({ id, prompt, choices, correctChoiceId }) => ({
      id: "q-" + id,
      prompt,
      choices,
      correctChoiceId,
    }));
  }
  // Default logic for other languages
  const basePrompts: string[] = [
    `Choose the correct ${language} word to complete the sentence`,
    `Pick the correct ${language} grammar form`,
    `Select the best ${language} synonym`,
    `Find the correct ${language} translation`,
    `Choose the correct ${language} verb tense`,
  ];
  const choicesFor = (index: number): Choice[] => {
    return [
      { id: "A", label: "Option A" },
      { id: "B", label: "Option B" },
      { id: "C", label: "Option C" },
      { id: "D", label: "Option D" },
    ].map((c) => ({ ...c, id: c.id + String(index) }));
  };
  return Array.from({ length: 30 }).map((_, idx) => {
    const promptRoot = basePrompts[idx % basePrompts.length];
    const qId = `q-${idx + 1}`;
    const options = choicesFor(idx + 1);
    const correct = options[(idx * 7) % options.length].id;
    return {
      id: qId,
      prompt: `${idx + 1}. ${promptRoot}.`,
      choices: options,
      correctChoiceId: correct,
    };
  });
}

function determineLevel(score: number) {
  if (score <= 10) return { level: "Beginner", color: "text-red-600" };
  if (score <= 20) return { level: "Intermediate", color: "text-yellow-600" };
  return { level: "Advanced", color: "text-green-600" };
}

export default function LevelsPage() {
  const languages: LanguageKey[] = ["English", "Russian"];
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageKey>("English");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = useMemo(
    () => generateQuestionBank(selectedLanguage),
    [selectedLanguage]
  );

  const currentQuestion =
    hasStarted && !isComplete ? questions[currentIndex] : null;

  const score = useMemo(() => {
    return questions.reduce(
      (sum, q) => (answers[q.id] === q.correctChoiceId ? sum + 1 : sum),
      0
    );
  }, [answers, questions]);

  const handleStart = () => {
    setHasStarted(true);
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setAnswers({});
    setIsComplete(false);
  };

  const handleSubmit = () => {
    if (!currentQuestion || !selectedChoiceId) return;

    const updated = { ...answers, [currentQuestion.id]: selectedChoiceId };
    setAnswers(updated);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoiceId(updated[questions[currentIndex + 1].id] || null);
    } else {
      // Calculate final score including the last answer
      const isCorrect = selectedChoiceId === currentQuestion.correctChoiceId;
      const finalScore = score + (isCorrect ? 1 : 0);

      // Persist result for dashboard
      try {
        const payload = {
          language: selectedLanguage,
          score: finalScore,
          total: questions.length,
          level: determineLevel(finalScore).level,
          completedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          "levelAssessment:lastResult",
          JSON.stringify(payload)
        );
      } catch (_) {}

      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedChoiceId(answers[questions[prevIndex].id] || null);
  };

  const handleRestart = () => {
    setHasStarted(false);
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setAnswers({});
    setIsComplete(false);
  };

  const result = determineLevel(score);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>ارزیابی سطح زبان</span>
              <span className="text-sm text-muted-foreground">۳۰ سوال</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!hasStarted && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">زبان خود را انتخاب کنید</Label>
                  <select
                    id="language"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                    value={selectedLanguage}
                    onChange={(e) =>
                      setSelectedLanguage(e.target.value as LanguageKey)
                    }
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang === "Russian"
                          ? "روسی"
                          : lang === "English"
                          ? "انگلیسی"
                          : lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleStart}
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    شروع ارزیابی
                  </Button>
                </div>
              </div>
            )}

            {hasStarted && !isComplete && currentQuestion && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    سوال {currentIndex + 1} از {questions.length}
                  </div>
                </div>

                <div
                  className="font-medium"
                  dir={
                    selectedLanguage === "English" ||
                    selectedLanguage === "Russian"
                      ? "ltr"
                      : undefined
                  }
                >
                  {currentQuestion.prompt}
                </div>

                <div className="space-y-3">
                  {currentQuestion.choices.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                        selectedChoiceId === c.id
                          ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                          : "border-border hover:bg-muted/40"
                      }`}
                      dir={
                        selectedLanguage === "English" ||
                        selectedLanguage === "Russian"
                          ? "ltr"
                          : undefined
                      }
                    >
                      <input
                        type="radio"
                        name={`q-${currentQuestion.id}`}
                        className="h-4 w-4"
                        checked={selectedChoiceId === c.id}
                        onChange={() => setSelectedChoiceId(c.id)}
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={
                      currentIndex === 0 || Object.keys(answers).length > 0
                    }
                  >
                    قبلی
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-violet-600 hover:bg-violet-700"
                    disabled={!selectedChoiceId}
                  >
                    {currentIndex + 1 === questions.length ? "ارسال" : "بعدی"}
                  </Button>
                </div>
              </div>
            )}

            {hasStarted && isComplete && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    زبان: {selectedLanguage}
                  </div>
                  <div className="text-3xl font-semibold">
                    امتیاز شما: {score}/{questions.length}
                  </div>
                  <div className={`text-xl font-medium ${result.color}`}>
                    سطح: {result.level}
                  </div>
                </div>
                {selectedLanguage === "English" ||
                  (selectedLanguage === "Russian" &&
                    (() => {
                      // Compute per-level score breakdown
                      const levelLabels = ["A1", "A2", "B1", "B2", "C1"];
                      const levels = { A1: [], A2: [], B1: [], B2: [], C1: [] };
                      const questionsToBreakdown =
                        selectedLanguage === "English"
                          ? englishQuestions
                          : russianQuestions;

                      questionsToBreakdown.forEach((q, i) => {
                        const key = q.level;
                        levels[key].push({
                          id: q.id,
                          correct: answers[`q-${q.id}`] === q.correctChoiceId,
                        });
                      });
                      return (
                        <div className="my-8">
                          <div className="font-semibold mb-2">
                            نتیجه بر اساس سطح
                          </div>
                          <table className="w-full text-sm border">
                            <thead>
                              <tr className="border-b">
                                <th className="p-2">سطح</th>
                                <th className="p-2">تعداد سوال</th>
                                <th className="p-2">تعداد صحیح</th>
                              </tr>
                            </thead>
                            <tbody>
                              {levelLabels.map((level) => (
                                <tr key={level} className="border-b">
                                  <td className="p-2 font-bold text-center">
                                    {level}
                                  </td>
                                  <td className="p-2 text-center">
                                    {levels[level].length}
                                  </td>
                                  <td className="p-2 text-center">
                                    {
                                      levels[level].filter((x) => x.correct)
                                        .length
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })())}
                <div className="my-8">
                  <div className="font-semibold mb-2">پاسخ های شما</div>
                  <div className="space-y-4">
                    {questions.map((q, idx) => {
                      const userAnswerId = answers[q.id];
                      const userAnswer = q.choices.find(
                        (c) => c.id === userAnswerId
                      );
                      const correctAnswer = q.choices.find(
                        (c) => c.id === q.correctChoiceId
                      );
                      const isCorrect = userAnswerId === q.correctChoiceId;
                      return (
                        <div
                          key={q.id}
                          className={`rounded p-3 border ${
                            isCorrect
                              ? "bg-green-50 border-green-400"
                              : "bg-red-50 border-red-400"
                          }`}
                          dir={
                            selectedLanguage === "English" ||
                            selectedLanguage === "Russian"
                              ? "ltr"
                              : undefined
                          }
                        >
                          <div className="mb-1 font-medium">
                            {idx + 1}. {q.prompt}
                          </div>
                          <div className="flex flex-col gap-1 text-sm">
                            <span>
                              انتخاب شما:{" "}
                              {userAnswer ? (
                                userAnswer.label
                              ) : (
                                <span className="text-gray-400">
                                  (پاسخ ندادید)
                                </span>
                              )}
                              {isCorrect && (
                                <span className="mx-2 text-green-600 font-semibold">
                                  درست
                                </span>
                              )}
                              {!isCorrect && (
                                <span className="mx-2 text-red-600 font-semibold">
                                  نادرست
                                </span>
                              )}
                            </span>
                            {!isCorrect && (
                              <span>
                                پاسخ صحیح:{" "}
                                <span className="text-green-800 font-semibold">
                                  {correctAnswer?.label}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={handleRestart}>
                    تغییر زبان
                  </Button>
                  <Button
                    onClick={handleStart}
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    تکرار آزمون
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
