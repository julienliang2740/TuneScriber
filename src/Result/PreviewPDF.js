import React, { useState } from 'react';
import { Dialog, Button, Flex } from '@radix-ui/themes';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: '100vh', opacity: 0 },
  visible: { y: '0', opacity: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.5 } },
  exit: { y: '100vh', opacity: 0, transition: { duration: 0.4 } }
};

const Modal = ({ showModal, setShowModal, pdfSrc }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal} appearance="dark">
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
            <Dialog.Content asChild>
              <motion.div
                className=""
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Dialog.Title className="text-xl font-semibold mb-4">PDF Preview</Dialog.Title>
                <Dialog.Description className="mb-4">Preview the PDF below.</Dialog.Description>
                {isLoading && <div className="text-center mb-4">Loading...</div>}
                <iframe
                  src={pdfSrc}
                  style={{ width: '100%', height: '70vh', border: 'none', display: isLoading ? 'none' : 'block' }}
                  title="PDF Preview"
                  onLoad={handleLoad}
                />
                <Flex justify="end" mt="4">
                  <Dialog.Close asChild>
                    <Button variant="soft" color="gray">Close</Button>
                  </Dialog.Close>
                </Flex>
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;