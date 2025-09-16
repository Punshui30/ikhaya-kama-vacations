import React from 'react';
import clsx from 'clsx';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'light' | 'dark' | 'pattern';
  padding?: 'small' | 'medium' | 'large';
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'default',
  padding = 'medium',
  id
}) => {
  return (
    <section
      id={id}
      className={clsx(
        styles.section,
        styles[`background-${background}`],
        styles[`padding-${padding}`],
        className
      )}
    >
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
};

export default Section;
