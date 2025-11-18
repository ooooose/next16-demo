'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles/Card.module.css';

export const Card = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <motion.div
      animate = {{ rotateY: open ? 180 : 0 }}
      transition={{ duration: 1 }}
      className={styles.card}
      onClick={() => setOpen(!open)}>
      {open ? '🎉' : '❓'}
    </motion.div>
  );
};