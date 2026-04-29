import { primitives, semantics } from "@/styles/tokens";
import { Text } from "@/components/ui/text";

// 유틸리티 함수: 시맨틱 색상 그룹화
function groupSemanticColors(colors: Record<string, string>) {
  const grouped: Record<string, { key: string; value: string }[]> = {};
  
  for (const [key, value] of Object.entries(colors)) {
    const category = key.split('-')[0]; // background, text, border, icon 등
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({ key, value });
  }
  
  return grouped;
}

export default function DesignSystemShowcase() {
  const semanticGroups = groupSemanticColors(semantics.colors);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f3f3f3] font-['Inter',sans-serif] p-8 md:p-16 selection:bg-[#bff269] selection:text-black">
      <header className="mb-20 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-[#767676] text-transparent bg-clip-text">
          Design System
        </h1>
        <p className="text-[#b3b3b3] text-lg md:text-xl max-w-2xl leading-relaxed">
          프로젝트에 적용된 2-Tier 구조의 디자인 토큰 쇼케이스입니다. Primitives(원시 값)와 Semantics(의미론적 변수)를 모두 한눈에 확인할 수 있습니다.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-32">
        
        {/* Primitives Section */}
        <section>
          <div className="mb-10 border-b border-[#2c2c2c] pb-6">
            <h2 className="text-3xl font-semibold mb-2">Primitive Colors</h2>
            <p className="text-[#767676]">시스템의 가장 기본이 되는 원시 색상 팔레트입니다.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {Object.entries(primitives.colors).map(([name, hex]) => (
              <div key={name} className="group flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full shadow-lg mb-3 border border-[#2c2c2c] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-sm font-medium text-[#e6e6e6] truncate w-full text-center">{name}</span>
                <span className="text-xs text-[#767676] font-mono mt-1">{hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Semantics Section */}
        <section>
          <div className="mb-10 border-b border-[#2c2c2c] pb-6">
            <h2 className="text-3xl font-semibold mb-2">Semantic Colors</h2>
            <p className="text-[#767676]">용도와 상황에 따라 매핑된 2-Tier 색상 변수들입니다.</p>
          </div>
          
          <div className="space-y-16">
            {Object.entries(semanticGroups).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-medium mb-6 capitalize text-[#bff269] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#bff269]" />
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => {
                    const isBorder = category === 'border';
                    const isText = category === 'text' || category === 'icon';
                    return (
                      <div 
                        key={item.key} 
                        className="p-4 rounded-xl border border-[#2c2c2c] bg-[#141414] hover:bg-[#1e1e1e] transition-colors duration-200 flex items-center gap-4"
                      >
                        <div 
                          className={`w-12 h-12 rounded-lg flex-shrink-0 ${isBorder ? 'border-2 bg-transparent' : ''}`}
                          style={{
                            backgroundColor: (!isBorder && !isText) ? item.value : 'transparent',
                            borderColor: isBorder ? item.value : '#2c2c2c',
                            color: isText ? item.value : 'inherit'
                          }}
                        >
                          {isText && (
                            <div className="w-full h-full flex items-center justify-center font-bold text-2xl">
                              Aa
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-white truncate" title={item.key}>
                            {item.key.replace(category + '-', '')}
                          </p>
                          <p className="text-xs text-[#767676] truncate mt-1">
                            var(--color-{item.key})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing Section */}
        <section>
          <div className="mb-10 border-b border-[#2c2c2c] pb-6">
            <h2 className="text-3xl font-semibold mb-2">Spacing</h2>
            <p className="text-[#767676]">여백, 패딩, 마진 등에 사용되는 간격 시스템입니다.</p>
          </div>
          <div className="flex flex-col gap-4">
            {Object.entries(primitives.spacing)
              .filter(([name]) => !name.includes('negative')) // 음수 값은 렌더링에서 제외 (시각화 복잡성)
              .sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
              .map(([name, value]) => (
              <div key={name} className="flex items-center gap-6 group">
                <div className="w-24 text-sm font-mono text-[#b3b3b3] group-hover:text-white transition-colors">{name}</div>
                <div className="w-16 text-xs text-[#767676] text-right pr-4 border-r border-[#2c2c2c]">{value}</div>
                <div 
                  className="h-8 bg-[#14ae5c] rounded-r-md opacity-80 group-hover:opacity-100 transition-all duration-300"
                  style={{ width: value }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Radius Section */}
        <section>
          <div className="mb-10 border-b border-[#2c2c2c] pb-6">
            <h2 className="text-3xl font-semibold mb-2">Radius</h2>
            <p className="text-[#767676]">모서리 곡률 시스템입니다.</p>
          </div>
          <div className="flex flex-wrap gap-8 items-end">
            {Object.entries(primitives.radius)
              .sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
              .map(([name, value]) => (
              <div key={name} className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-24 h-24 bg-[#2c2c2c] border border-[#5a5a5a] group-hover:bg-[#434343] transition-colors duration-300 flex items-center justify-center text-xs text-[#b3b3b3]"
                  style={{ borderRadius: value }}
                >
                  {value}
                </div>
                <span className="text-sm font-mono text-[#e6e6e6]">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <div className="mb-10 border-b border-[#2c2c2c] pb-6">
            <h2 className="text-3xl font-semibold mb-2">Typography (UI Component)</h2>
            <p className="text-[#767676]">새로 구축된 <code>&lt;Text /&gt;</code> 컴포넌트를 이용한 타입 스케일 예시입니다.</p>
          </div>
          <div className="flex flex-col gap-10 bg-[#141414] p-8 md:p-12 rounded-2xl border border-[#2c2c2c]">
            <div>
              <span className="text-xs text-[#767676] font-mono mb-2 block">variant="title" size="hero"</span>
              <Text variant="title" size="hero">Title Hero</Text>
            </div>
            <div>
              <span className="text-xs text-[#767676] font-mono mb-2 block">variant="title" size="page"</span>
              <Text variant="title" size="page">Title Page</Text>
            </div>
            <div>
              <span className="text-xs text-[#767676] font-mono mb-2 block">variant="subtitle" size="xl"</span>
              <Text variant="subtitle" size="xl">Subtitle</Text>
            </div>
            <div>
              <span className="text-xs text-[#767676] font-mono mb-2 block">variant="heading" size="lg"</span>
              <Text variant="heading" size="lg">Heading</Text>
            </div>
            <div>
              <span className="text-xs text-[#767676] font-mono mb-2 block">variant="subheading" size="md"</span>
              <Text variant="subheading" size="md">Subheading</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#2c2c2c]">
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="body" size="base"</span>
                <Text variant="body" size="base">Body Base: The quick brown fox jumps over the lazy dog.</Text>
              </div>
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="body" size="base" weight="strong"</span>
                <Text variant="body" size="base" weight="strong">Body Strong: The quick brown fox jumps over the lazy dog.</Text>
              </div>
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="body" size="sm"</span>
                <Text variant="body" size="sm">Body Small: The quick brown fox jumps over the lazy dog.</Text>
              </div>
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="body" size="sm" weight="strong"</span>
                <Text variant="body" size="sm" weight="strong">Body Small Strong: The quick brown fox jumps over the lazy dog.</Text>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#2c2c2c]">
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="code" size="base"</span>
                <Text variant="code" size="base">const bodyCode = "Hello World";</Text>
              </div>
              <div>
                <span className="text-xs text-[#767676] font-mono mb-2 block">variant="link" size="base"</span>
                <Text variant="link" size="base">Body Link (Hover me)</Text>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
