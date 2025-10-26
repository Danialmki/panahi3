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

function generateQuestionBank(language: LanguageKey): Question[] {
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

  const questions: Question[] = Array.from({ length: 30 }).map((_, idx) => {
    const promptRoot = basePrompts[idx % basePrompts.length];
    const qId = `q-${idx + 1}`;
    const options = choicesFor(idx + 1);
    const correct = options[(idx * 7) % options.length].id; // pseudo-random but deterministic
    return {
      id: qId,
      prompt: `${idx + 1}. ${promptRoot}.`,
      choices: options,
      correctChoiceId: correct,
    };
  });

  return questions;
}

function determineLevel(score: number) {
  if (score <= 10) return { level: "Beginner", color: "text-red-600" };
  if (score <= 20) return { level: "Intermediate", color: "text-yellow-600" };
  return { level: "Advanced", color: "text-green-600" };
}

export default function LevelsPage() {
  const languages: LanguageKey[] = [
    "English",
    "Spanish",
    "French",
    "Arabic",
    "German",
    "Turkish",
  ];
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
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-600"
                    value={selectedLanguage}
                    onChange={(e) =>
                      setSelectedLanguage(e.target.value as LanguageKey)
                    }
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
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
                  <div className="text-sm">امتیاز: {score}</div>
                </div>

                <div className="font-medium">{currentQuestion.prompt}</div>

                <div className="space-y-3">
                  {currentQuestion.choices.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                        selectedChoiceId === c.id
                          ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                          : "border-border hover:bg-muted/40"
                      }`}
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
                    disabled={currentIndex === 0}
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
