import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { HeroBanner } from '@/components/hero-banner';
import { cn } from '@/lib/cn';

const base = defaultMdxComponents;

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...base,
    HeroBanner,
    img: (props) => <img {...props} />,
    h1: (props) => {
      const Comp = base.h1 ?? 'h1';
      return <Comp {...props} className={cn('font-serif', props.className)} />;
    },
    h2: (props) => {
      const Comp = base.h2 ?? 'h2';
      return <Comp {...props} className={cn('font-serif', props.className)} />;
    },
    h3: (props) => {
      const Comp = base.h3 ?? 'h3';
      return (
        <Comp
          {...props}
          className={cn('font-mono font-normal', props.className)}
        />
      );
    },
    h4: (props) => {
      const Comp = base.h4 ?? 'h4';
      return (
        <Comp
          {...props}
          className={cn('font-mono font-normal', props.className)}
        />
      );
    },
    h5: (props) => {
      const Comp = base.h5 ?? 'h5';
      return (
        <Comp
          {...props}
          className={cn('font-mono font-normal', props.className)}
        />
      );
    },
    h6: (props) => {
      const Comp = base.h6 ?? 'h6';
      return (
        <Comp
          {...props}
          className={cn('font-mono font-normal', props.className)}
        />
      );
    },
    ...components,
  };
}
