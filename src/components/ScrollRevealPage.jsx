import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';

const RevealComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const ScrollRevealPage = () => {
  return (
    <Container>
      <Box my={4}>
        {[...Array(10)].map((_, index) => (
          <RevealComponent key={index}>
            <Card sx={{ my: 2 }}>
              <CardContent>
                <Typography variant="h5">
                  Revealing Card {index + 1}
                </Typography>
                <Typography variant="body2">
                  This card reveals as you scroll down the page.
                </Typography>
              </CardContent>
            </Card>
          </RevealComponent>
        ))}
      </Box>
    </Container>
  );
};

export default ScrollRevealPage; 
