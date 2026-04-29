"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 이름과 내용이 모두 채워져 있어야 버튼 활성화
  const isFormValid = name.trim().length > 0 && message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('customer_inquiries')
        .insert([
          { name, message } // created_at은 DB에서 자동 생성
        ]);

      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      
      // 폼 초기화
      setName("");
      setMessage("");
    } catch (error) {
      console.error("문의 접수 중 오류 발생:", error);
      alert("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-default-default">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-800">
        <div className="w-full max-w-2xl bg-background-default-default p-800 rounded-xl border border-solid border-border-default-default shadow-sm">
          <div className="mb-800 text-center">
            <h1 className="text-3xl font-bold text-text-default-default mb-200">고객 문의</h1>
            <p className="text-base text-text-default-secondary">
              궁금한 점이나 건의사항을 남겨주시면 신속하게 답변해 드리겠습니다.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-1600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background-positive-secondary text-text-positive-default mb-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-default-default mb-200">문의가 접수되었습니다.</h2>
              <p className="text-base text-text-default-secondary mb-800">
                담당자가 확인 후 입력해주신 연락처로 답변 드리겠습니다.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="primary" size="md">
                다른 문의 남기기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-600">
              <Input
                label="이름"
                description="실명을 한글로 입력해 주세요."
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                pattern="^[가-힣]+$"
                error={name && !/^[가-힣]+$/.test(name) ? "한글 이름만 입력 가능합니다." : undefined}
              />

              <Textarea
                label="문의 내용"
                description="문의하실 내용을 상세히 적어주세요."
                placeholder="문의 내용을 입력해 주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
              />

              <div className="pt-400">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!isFormValid || isSubmitting || (name.length > 0 && !/^[가-힣]+$/.test(name))}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "제출 중..." : "문의 접수하기"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
