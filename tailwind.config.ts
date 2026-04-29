import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      'text': {
            'default': {
                  'default': "var(--color-text-default-default)",
                  'secondary': "var(--color-text-default-secondary)",
                  'tertiary': "var(--color-text-default-tertiary)"
            },
            'warning': {
                  'on': {
                        'warning': "var(--color-text-warning-on-warning)"
                  },
                  'default': "var(--color-text-warning-default)",
                  'secondary': "var(--color-text-warning-secondary)",
                  'tertiary': "var(--color-text-warning-tertiary)"
            },
            'neutral': {
                  'on': {
                        'neutral': "var(--color-text-neutral-on-neutral)"
                  },
                  'default': "var(--color-text-neutral-default)",
                  'secondary': "var(--color-text-neutral-secondary)",
                  'tertiary': "var(--color-text-neutral-tertiary)"
            },
            'disabled': {
                  'default': "var(--color-text-disabled-default)",
                  'on': {
                        'disabled': "var(--color-text-disabled-on-disabled)"
                  }
            },
            'brand': {
                  'default': "var(--color-text-brand-default)",
                  'secondary': "var(--color-text-brand-secondary)",
                  'tertiary': "var(--color-text-brand-tertiary)",
                  'on': {
                        'brand': "var(--color-text-brand-on-brand)"
                  }
            },
            'danger': {
                  'default': "var(--color-text-danger-default)",
                  'secondary': "var(--color-text-danger-secondary)",
                  'tertiary': "var(--color-text-danger-tertiary)",
                  'on': {
                        'danger': "var(--color-text-danger-on-danger)"
                  }
            },
            'positive': {
                  'default': "var(--color-text-positive-default)",
                  'secondary': "var(--color-text-positive-secondary)",
                  'tertiary': "var(--color-text-positive-tertiary)",
                  'on': {
                        'positive': "var(--color-text-positive-on-positive)"
                  }
            }
      },
      'border': {
            'default': {
                  'default': "var(--color-border-default-default)",
                  'secondary': "var(--color-border-default-secondary)",
                  'tertiary': "var(--color-border-default-tertiary)"
            },
            'warning': {
                  'tertiary': "var(--color-border-warning-tertiary)",
                  'default': "var(--color-border-warning-default)",
                  'secondary': "var(--color-border-warning-secondary)"
            },
            'utilities': {
                  'swatch': "var(--color-border-utilities-swatch)"
            },
            'neutral': {
                  'tertiary': "var(--color-border-neutral-tertiary)",
                  'default': "var(--color-border-neutral-default)",
                  'secondary': "var(--color-border-neutral-secondary)"
            },
            'disabled': {
                  'default': "var(--color-border-disabled-default)"
            },
            'brand': {
                  'default': "var(--color-border-brand-default)",
                  'secondary': "var(--color-border-brand-secondary)",
                  'tertiary': "var(--color-border-brand-tertiary)"
            },
            'positive': {
                  'default': "var(--color-border-positive-default)",
                  'secondary': "var(--color-border-positive-secondary)"
            },
            'danger': {
                  'default': "var(--color-border-danger-default)",
                  'secondary': "var(--color-border-danger-secondary)",
                  'tertiary': "var(--color-border-danger-tertiary)"
            }
      },
      'background': {
            'warning': {
                  'tertiary': "var(--color-background-warning-tertiary)",
                  'secondary': "var(--color-background-warning-secondary)",
                  'default': "var(--color-background-warning-default)",
                  'hover': "var(--color-background-warning-hover)"
            },
            'default': {
                  'default': "var(--color-background-default-default)",
                  'secondary': "var(--color-background-default-secondary)",
                  'tertiary': "var(--color-background-default-tertiary)"
            },
            'disabled': {
                  'default': "var(--color-background-disabled-default)"
            },
            'brand': {
                  'default': "var(--color-background-brand-default)",
                  'hover': "var(--color-background-brand-hover)",
                  'secondary': "var(--color-background-brand-secondary)"
            },
            'neutral': {
                  'default': "var(--color-background-neutral-default)",
                  'hover': "var(--color-background-neutral-hover)",
                  'secondary': "var(--color-background-neutral-secondary)",
                  'tertiary': "var(--color-background-neutral-tertiary)"
            },
            'positive': {
                  'default': "var(--color-background-positive-default)",
                  'hover': "var(--color-background-positive-hover)",
                  'secondary': "var(--color-background-positive-secondary)",
                  'tertiary': "var(--color-background-positive-tertiary)"
            },
            'danger': {
                  'default': "var(--color-background-danger-default)",
                  'hover': "var(--color-background-danger-hover)",
                  'secondary': "var(--color-background-danger-secondary)",
                  'tertiary': "var(--color-background-danger-tertiary)"
            },
            'utilities': {
                  'scrim': "var(--color-background-utilities-scrim)",
                  'blanket': "var(--color-background-utilities-blanket)",
                  'overlay': "var(--color-background-utilities-overlay)",
                  'measurement': "var(--color-background-utilities-measurement)"
            }
      },
      'icon': {
            'warning': {
                  'on': {
                        'warning': "var(--color-icon-warning-on-warning)"
                  },
                  'default': "var(--color-icon-warning-default)",
                  'secondary': "var(--color-icon-warning-secondary)",
                  'tertiary': "var(--color-icon-warning-tertiary)"
            },
            'small': "var(--color-icon-small)",
            'default': {
                  'default': "var(--color-icon-default-default)",
                  'secondary': "var(--color-icon-default-secondary)",
                  'tertiary': "var(--color-icon-default-tertiary)"
            },
            'disabled': {
                  'default': "var(--color-icon-disabled-default)"
            },
            'brand': {
                  'default': "var(--color-icon-brand-default)",
                  'secondary': "var(--color-icon-brand-secondary)",
                  'on': {
                        'brand': "var(--color-icon-brand-on-brand)"
                  }
            },
            'neutral': {
                  'default': "var(--color-icon-neutral-default)",
                  'secondary': "var(--color-icon-neutral-secondary)",
                  'tertiary': "var(--color-icon-neutral-tertiary)",
                  'on': {
                        'neutral': "var(--color-icon-neutral-on-neutral)"
                  }
            },
            'positive': {
                  'default': "var(--color-icon-positive-default)",
                  'secondary': "var(--color-icon-positive-secondary)",
                  'tertiary': "var(--color-icon-positive-tertiary)",
                  'on': {
                        'positive': "var(--color-icon-positive-on-positive)"
                  }
            },
            'danger': {
                  'default': "var(--color-icon-danger-default)",
                  'secondary': "var(--color-icon-danger-secondary)",
                  'tertiary': "var(--color-icon-danger-tertiary)",
                  'on': {
                        'danger': "var(--color-icon-danger-on-danger)"
                  }
            }
      }
},
      spacing: {
      '100': "var(--space-100)",
      '200': "var(--space-200)",
      '300': "var(--space-300)",
      '400': "var(--space-400)",
      '600': "var(--space-600)",
      '800': "var(--space-800)",
      '1600': "var(--space-1600)",
      '2400': "var(--space-2400)",
      '4000': "var(--space-4000)",
      'negative-100': "var(--space-negative-100)",
      'negative-200': "var(--space-negative-200)",
      'negative-300': "var(--space-negative-300)",
      'negative-400': "var(--space-negative-400)",
      'negative-600': "var(--space-negative-600)"
},
      borderRadius: {
      '100': "var(--radius-100)",
      '200': "var(--radius-200)",
      '400': "var(--radius-400)",
      'xl': "var(--radius-xl)",
      'full': "var(--radius-full)"
}
    },
  },
  plugins: [],
};
export default config;
