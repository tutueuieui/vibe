import React from "react";
import { primitives, semantics } from "@/styles/tokens";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodePreview } from "@/components/ui/code-preview";
import { ArrowRight, Star, Menu, X, Search, Bell } from "lucide-react";

// 유틸리티 함수: 시맨틱 색상 그룹화
function groupSemanticColors(colors: Record<string, string>) {
  const groups: Record<string, { name: string; value: string }[]> = {};
  for (const [key, value] of Object.entries(colors)) {
    const parts = key.split("-");
    const category = parts[0];
    if (!groups[category]) groups[category] = [];
    groups[category].push({ name: key, value });
  }
  return groups;
}

export default function DesignSystemPage() {
  const semanticGroups = groupSemanticColors(semantics.colors);

  return (
    <div className="min-h-screen bg-default-secondary text-default-default p-8 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-default">Design System</h1>
          <p className="text-xl text-default-secondary max-w-2xl">
            A comprehensive showcase of our tokens, components, and patterns. 
            Built with React, Tailwind CSS, and standard UI components.
          </p>
        </header>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto flex-nowrap rounded-xl p-2 bg-neutral-tertiary">
            <TabsTrigger value="colors" className="px-6 py-3 rounded-lg">Colors</TabsTrigger>
            <TabsTrigger value="typography" className="px-6 py-3 rounded-lg">Typography</TabsTrigger>
            <TabsTrigger value="spacing" className="px-6 py-3 rounded-lg">Spacing & Radius</TabsTrigger>
            <TabsTrigger value="buttons" className="px-6 py-3 rounded-lg">Buttons</TabsTrigger>
            <TabsTrigger value="components" className="px-6 py-3 rounded-lg">Inputs & Cards</TabsTrigger>
            <TabsTrigger value="layout" className="px-6 py-3 rounded-lg">Header & Footer</TabsTrigger>
          </TabsList>

          {/* COLORS TAB */}
          <TabsContent value="colors" className="space-y-16">
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Primitive Colors</h2>
                <p className="text-default-secondary mt-2">The raw color palette that forms the foundation of our design system.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(primitives.colors).map(([name, hex]) => (
                  <div key={name} className="flex flex-col gap-3 group">
                    <div 
                      className="h-24 w-full rounded-2xl shadow-sm transition-transform group-hover:scale-105"
                      style={{ backgroundColor: hex }}
                    />
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-default-secondary font-mono">{hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Semantic Colors</h2>
                <p className="text-default-secondary mt-2">Purpose-driven color tokens. Always use these in your code (e.g. <code>bg-brand-default</code>).</p>
              </div>
              {Object.entries(semanticGroups).map(([group, tokens]) => (
                <div key={group} className="mt-10">
                  <h3 className="text-xl font-medium mb-4 capitalize">{group}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {tokens.map(({ name, value }) => (
                      <div key={name} className="flex flex-col gap-3 group">
                        <div 
                          className="h-20 w-full rounded-xl shadow-sm relative overflow-hidden"
                          style={{ backgroundColor: `var(--color-${name})` }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-sm">
                            <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">var(--color-{name})</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm break-all">{name}</div>
                          <div className="text-xs text-default-secondary font-mono mt-1">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </TabsContent>

          {/* TYPOGRAPHY TAB */}
          <TabsContent value="typography" className="space-y-16">
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Typography Scale</h2>
                <p className="text-default-secondary mt-2">Text component variants mapped directly from Figma.</p>
              </div>
              <div className="space-y-8 bg-default-default p-8 rounded-2xl border border-default-default">
                <div>
                  <span className="text-xs text-default-secondary font-mono mb-2 block">variant="title" size="hero"</span>
                  <Text variant="title" size="hero">Hero Title</Text>
                </div>
                <div>
                  <span className="text-xs text-default-secondary font-mono mb-2 block">variant="title" size="page"</span>
                  <Text variant="title" size="page">Page Title</Text>
                </div>
                <div>
                  <span className="text-xs text-default-secondary font-mono mb-2 block">variant="heading" size="lg"</span>
                  <Text variant="heading" size="lg">Heading Large</Text>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-default-default">
                  <div>
                    <span className="text-xs text-default-secondary font-mono mb-2 block">variant="body" size="base"</span>
                    <Text variant="body" size="base">The quick brown fox jumps over the lazy dog.</Text>
                  </div>
                  <div>
                    <span className="text-xs text-default-secondary font-mono mb-2 block">variant="body" size="base" weight="strong"</span>
                    <Text variant="body" size="base" weight="strong">The quick brown fox jumps over the lazy dog.</Text>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* SPACING TAB */}
          <TabsContent value="spacing" className="space-y-16">
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Spacing</h2>
                <p className="text-default-secondary mt-2">Tailwind spacing utilities (e.g. <code>p-400</code>, <code>gap-200</code>).</p>
              </div>
              <div className="flex flex-col gap-6">
                {Object.entries(primitives.spacing).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-6">
                    <div className="w-32 text-sm font-mono">{name}</div>
                    <div className="w-16 text-sm text-default-secondary">{value}</div>
                    <div className="bg-brand-default rounded-sm h-8" style={{ width: value }} />
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* BUTTONS TAB */}
          <TabsContent value="buttons" className="space-y-16">

            {/* ── Section 1: Standard Buttons ── */}
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Button</h2>
                <p className="text-default-secondary mt-2">
                  3가지 Variant(Primary, Neutral, Subtle) × 3가지 State(Default, Hover*, Disabled) × 2가지 Size(md, sm)
                </p>
              </div>

              {/* Medium Matrix */}
              <div>
                <p className="text-sm font-semibold mb-4 text-default-secondary uppercase tracking-wider">Size: Medium</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-default-default">
                        <th className="text-left py-3 pr-6 font-medium text-default-secondary w-32">Variant</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-center">Default</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-center">Disabled</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-left">Usage code</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-default">
                      {[
                        { variant: "primary" as const, label: "Primary", code: `<Button variant="primary">Button</Button>` },
                        { variant: "neutral" as const, label: "Neutral", code: `<Button variant="neutral">Button</Button>` },
                        { variant: "subtle" as const,  label: "Subtle",  code: `<Button variant="subtle">Button</Button>` },
                      ].map(({ variant, label, code }) => (
                        <tr key={variant} className="group">
                          <td className="py-4 pr-6 font-mono text-xs text-default-secondary">{label}</td>
                          <td className="py-4 px-6 text-center">
                            <Button variant={variant} size="md">Button</Button>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button variant={variant} size="md" disabled>Button</Button>
                          </td>
                          <td className="py-4 pl-6">
                            <code className="text-xs bg-neutral-tertiary px-2 py-1 rounded font-mono text-default-secondary">{code}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Small Matrix */}
              <div>
                <p className="text-sm font-semibold mb-4 text-default-secondary uppercase tracking-wider">Size: Small</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-default-default">
                        <th className="text-left py-3 pr-6 font-medium text-default-secondary w-32">Variant</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-center">Default</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-center">Disabled</th>
                        <th className="py-3 px-6 font-medium text-default-secondary text-left">Usage code</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-default">
                      {[
                        { variant: "primary" as const, label: "Primary", code: `<Button variant="primary" size="sm">Button</Button>` },
                        { variant: "neutral" as const, label: "Neutral", code: `<Button variant="neutral" size="sm">Button</Button>` },
                        { variant: "subtle" as const,  label: "Subtle",  code: `<Button variant="subtle" size="sm">Button</Button>` },
                      ].map(({ variant, label, code }) => (
                        <tr key={variant}>
                          <td className="py-4 pr-6 font-mono text-xs text-default-secondary">{label}</td>
                          <td className="py-4 px-6 text-center">
                            <Button variant={variant} size="sm">Button</Button>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button variant={variant} size="sm" disabled>Button</Button>
                          </td>
                          <td className="py-4 pl-6">
                            <code className="text-xs bg-neutral-tertiary px-2 py-1 rounded font-mono text-default-secondary">{code}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* With icons */}
              <div>
                <p className="text-sm font-semibold mb-4 text-default-secondary uppercase tracking-wider">With Icons / Loading</p>
                <div className="flex flex-wrap gap-4 items-center p-6 bg-default-default rounded-xl border border-default-default">
                  <Button variant="primary" leftIcon={<Star className="w-4 h-4" />}>Left Icon</Button>
                  <Button variant="neutral" rightIcon={<ArrowRight className="w-4 h-4" />}>Right Icon</Button>
                  <Button variant="primary" isLoading>Loading</Button>
                  <Button variant="neutral" isLoading size="sm">Loading sm</Button>
                </div>
                <div className="mt-3 p-4 rounded-lg bg-[#141414] text-sm text-[#f3f3f3] font-mono">
                  <pre>{`<Button variant="primary" leftIcon={<Star />}>Left Icon</Button>
<Button variant="neutral" rightIcon={<ArrowRight />}>Right Icon</Button>
<Button variant="primary" isLoading>Loading</Button>`}</pre>
                </div>
              </div>
            </section>

            {/* ── Section 2: Danger Buttons ── */}
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Button Danger</h2>
                <p className="text-default-secondary mt-2">
                  위험/삭제 액션에 사용하는 버튼. Danger Primary와 Danger Subtle 두 가지 스타일이 있습니다.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-default-default">
                      <th className="text-left py-3 pr-6 font-medium text-default-secondary w-40">Variant</th>
                      <th className="py-3 px-6 font-medium text-default-secondary text-center">Medium / Default</th>
                      <th className="py-3 px-6 font-medium text-default-secondary text-center">Medium / Disabled</th>
                      <th className="py-3 px-6 font-medium text-default-secondary text-center">Small / Default</th>
                      <th className="py-3 px-6 font-medium text-default-secondary text-center">Small / Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default-default">
                    <tr>
                      <td className="py-4 pr-6 font-mono text-xs text-default-secondary">danger (Primary)</td>
                      <td className="py-4 px-6 text-center"><Button variant="danger" size="md">Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger" size="md" disabled>Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger" size="sm">Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger" size="sm" disabled>Button</Button></td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 font-mono text-xs text-default-secondary">danger-subtle</td>
                      <td className="py-4 px-6 text-center"><Button variant="danger-subtle" size="md">Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger-subtle" size="md" disabled>Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger-subtle" size="sm">Button</Button></td>
                      <td className="py-4 px-6 text-center"><Button variant="danger-subtle" size="sm" disabled>Button</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-3 p-4 rounded-lg bg-[#141414] text-sm text-[#f3f3f3] font-mono">
                <pre>{`<Button variant="danger">삭제</Button>
<Button variant="danger-subtle">취소</Button>`}</pre>
              </div>
            </section>

            {/* ── Section 3: Icon Buttons ── */}
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Icon Button</h2>
                <p className="text-default-secondary mt-2">
                  3가지 Variant × 3가지 State × 2가지 Size. 아이콘 하나만 표시하는 원형 버튼.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-default-default">
                      <th className="text-left py-3 pr-6 font-medium text-default-secondary w-32">Variant</th>
                      <th className="py-3 px-4 font-medium text-default-secondary text-center">md / Default</th>
                      <th className="py-3 px-4 font-medium text-default-secondary text-center">md / Disabled</th>
                      <th className="py-3 px-4 font-medium text-default-secondary text-center">sm / Default</th>
                      <th className="py-3 px-4 font-medium text-default-secondary text-center">sm / Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default-default">
                    {[
                      { variant: "primary" as const, label: "primary" },
                      { variant: "neutral" as const, label: "neutral" },
                      { variant: "subtle" as const,  label: "subtle" },
                    ].map(({ variant, label }) => (
                      <tr key={variant}>
                        <td className="py-4 pr-6 font-mono text-xs text-default-secondary">{label}</td>
                        <td className="py-4 px-4 text-center">
                          <IconButton variant={variant} size="md" icon={<Star className="w-5 h-5" />} aria-label={`${label}-md`} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <IconButton variant={variant} size="md" icon={<Star className="w-5 h-5" />} aria-label={`${label}-md-dis`} disabled />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <IconButton variant={variant} size="sm" icon={<Star className="w-4 h-4" />} aria-label={`${label}-sm`} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <IconButton variant={variant} size="sm" icon={<Star className="w-4 h-4" />} aria-label={`${label}-sm-dis`} disabled />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 p-4 rounded-lg bg-[#141414] text-sm text-[#f3f3f3] font-mono">
                <pre>{`<IconButton variant="primary" size="md" icon={<Star />} aria-label="action" />
<IconButton variant="neutral" size="sm" icon={<Search />} aria-label="search" />`}</pre>
              </div>
            </section>

            {/* ── Section 4: Button Group ── */}
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Button Group</h2>
                <p className="text-default-secondary mt-2">
                  두 버튼을 쌍으로 배치. Justify(균등), Start, End, Center, Stack 5가지 정렬 모드.
                </p>
              </div>

              <div className="space-y-6 p-6 bg-default-default rounded-xl border border-default-default">
                {(["justify","start","end","center","stack"] as const).map((align) => (
                  <div key={align} className="flex items-center gap-8">
                    <span className="w-24 font-mono text-xs text-default-secondary shrink-0">{align}</span>
                    <div className="flex-1 max-w-xs">
                      <ButtonGroup align={align} cancelLabel="Cancel" confirmLabel="Confirm" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-[#141414] text-sm text-[#f3f3f3] font-mono">
                <pre>{`<ButtonGroup align="justify" cancelLabel="Cancel" confirmLabel="Confirm" />
<ButtonGroup align="stack" cancelLabel="Cancel" confirmLabel="Confirm" />`}</pre>
              </div>
            </section>

          </TabsContent>


          {/* COMPONENTS TAB */}
          <TabsContent value="components" className="space-y-16">
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Inputs</h2>
                <p className="text-default-secondary mt-2">Form input fields.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CodePreview code={`<Input 
  label="Email Address" 
  placeholder="name@example.com" 
  description="We'll never share your email." 
/>`}>
                  <div className="w-full max-w-sm">
                    <Input 
                      label="Email Address" 
                      placeholder="name@example.com" 
                      description="We'll never share your email." 
                    />
                  </div>
                </CodePreview>

                <CodePreview code={`<Input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters." 
/>`}>
                  <div className="w-full max-w-sm">
                    <Input 
                      label="Password" 
                      type="password" 
                      error="Password must be at least 8 characters." 
                      defaultValue="123"
                    />
                  </div>
                </CodePreview>

                <CodePreview code={`<Input 
  label="Disabled Field" 
  disabled 
  value="Cannot edit this" 
/>`}>
                  <div className="w-full max-w-sm">
                    <Input 
                      label="Disabled Field" 
                      disabled 
                      value="Cannot edit this" 
                      description="This field is currently read-only."
                    />
                  </div>
                </CodePreview>
              </div>
            </section>

            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Cards</h2>
                <p className="text-default-secondary mt-2">Versatile container component.</p>
              </div>

              <CodePreview code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Design System</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input label="Project Name" placeholder="My awesome project" />
  </CardContent>
  <CardFooter className="flex justify-end gap-200">
    <Button variant="neutral">Cancel</Button>
    <Button variant="primary">Deploy</Button>
  </CardFooter>
</Card>`}>
                <Card className="w-full max-w-[350px]">
                  <CardHeader>
                    <CardTitle>Design System</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input label="Project Name" placeholder="My awesome project" />
                  </CardContent>
                  <CardFooter className="flex justify-end gap-200">
                    <Button variant="neutral">Cancel</Button>
                    <Button variant="primary">Deploy</Button>
                  </CardFooter>
                </Card>
              </CodePreview>
            </section>
          </TabsContent>

          {/* LAYOUT TAB */}
          <TabsContent value="layout" className="space-y-16">
            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Header</h2>
                <p className="text-default-secondary mt-2">Desktop / Mobile 플랫폼 prop을 지원하는 네비게이션 헤더입니다.</p>
              </div>

              <CodePreview code={`<Header
  navLinks={[
    { label: "Products" },
    { label: "Solutions", active: true },
    { label: "Community" },
    { label: "Resources" },
    { label: "Pricing" },
    { label: "Contact" },
  ]}
  signInLabel="Sign in"
  registerLabel="Register"
/>`}>
                <div className="w-full border border-border-default-default rounded-xl overflow-hidden">
                  <Header
                    navLinks={[
                      { label: "Products" },
                      { label: "Solutions", active: true },
                      { label: "Community" },
                      { label: "Resources" },
                      { label: "Pricing" },
                      { label: "Contact" },
                    ]}
                    signInLabel="Sign in"
                    registerLabel="Register"
                  />
                </div>
              </CodePreview>
            </section>

            <section className="space-y-6">
              <div className="border-b border-default-default pb-4">
                <h2 className="text-3xl font-semibold">Footer</h2>
                <p className="text-default-secondary mt-2">링크 컬럼 3개와 소셜 아이콘을 포함한 사이트 푸터입니다.</p>
              </div>

              <CodePreview code={`<Footer
  logo={<span className="text-xl font-bold">Logo</span>}
  socialIcons={[<X />, <Menu />]}
/>`}>
                <div className="w-full border border-default-secondary rounded-xl overflow-hidden">
                  <Footer
                    logo={<span className="text-xl font-bold text-brand-default">Logo</span>}
                    socialIcons={[
                      <Star key="1" className="w-5 h-5 text-default-secondary" />,
                      <Bell key="2" className="w-5 h-5 text-default-secondary" />,
                      <Menu key="3" className="w-5 h-5 text-default-secondary" />,
                    ]}
                  />
                </div>
              </CodePreview>
            </section>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
