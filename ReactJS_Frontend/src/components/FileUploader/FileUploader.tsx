import { useEffect, useState } from 'react';
import {
  FileButton,
  Button,
  Text,
  Paper,
  Flex,
  Pill,
  Modal,
  Title,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface FileUploaderProps {
  file: File | null | any;
  setFile: any;
  modalTitle?: string;
  buttonTitle?: string;
  error?: any;
  multiple?: boolean;
}

const FileUploader = ({
  file = null,
  setFile = () => {},
  modalTitle = '',
  buttonTitle = '',
  error = '',
  multiple = true,
}: FileUploaderProps) => {
  // const [file, setFile] = useState<File | null | any>(null);

  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setrefresh] = useState(false);
  const [borderColor, setborderColor] = useState('#e9ecef');

  useEffect(() => {
    if (error) {
      setborderColor('red');
    } else {
      setborderColor('#e9ecef');
    }
  }, [error]);

  return (
    <Stack miw={400}>
      <Flex direction={'row'} mb={-10}>
        <Title order={6} me={2} c={'var(--mantine-primary-color-light-color)'}>
          {modalTitle}
        </Title>
        <Title order={6} c={'red'}>
          {'*'}
        </Title>
      </Flex>
      <Paper
        shadow='xs'
        radius='sm'
        //   w={'30rem'}

        onFocus={() => {
          setborderColor('var(--mantine-primary-color-light-color)');
        }}
        onBlur={() => {
          if (error) {
            setborderColor('red');
          } else {
            setborderColor('#e9ecef');
          }
        }}
        withBorder
        p='10'
        styles={{
          root: {
            borderColor: borderColor,
            overflow: 'hidden',
          },
        }}
      >
        <Flex
          direction={'row'}
          gap={10}
          align={'center'}
          justify={'space-between'}
        >
          <Flex gap={10} align={'center'}>
            <FileButton
              onChange={(data: any) => {
                console.log('data', data);
                if (!multiple) {
                  setFile([data]);
                } else {
                  setFile(data);
                }

                // if (data.length > 0) {
                //      setFile(data)
                // }
              }}
              multiple={multiple}
              //    accept="image/png,image/jpeg"
              //    accept=''
            >
              {(props) => <Button {...props}>{buttonTitle}</Button>}
            </FileButton>
            <Text
            // size="sm" ta="center" mt="sm"
            >
              {file &&
                (file?.length > 1
                  ? `${file?.length} Files Selected`
                  : file[0]?.name)}
            </Text>
          </Flex>
          {file?.length > 1 && (
            <Button variant='transparent' onClick={open}>
              Show All Selected Files
            </Button>
          )}
        </Flex>
      </Paper>

      {
        //   error &&
        <Text mt={-15} c={'red'}>
          {error}
        </Text>
      }

      <Modal
        opened={opened}
        onClose={close}
        size='auto'
        title={modalTitle}
        // centered
      >
        {Array.isArray(file) &&
          file.map((afile, index) => (
            <Text key={index}>
              <Pill
                key={index}
                style={{
                  textDecoration: file[index].removed ? 'line-through' : '',
                }}
                onRemove={() => {
                  console.log(
                    'To remove afile.name',
                    afile.name,
                    file[index].removed
                  );
                  file[index].removed = true;
                  setrefresh(!refresh);
                }}
                withRemoveButton={!file[index].removed}
              >
                {afile.name}
              </Pill>
            </Text>
          ))}

        <Button
          disabled={!(Array.isArray(file) && file?.some((v) => v.removed))}
          // variant='transparent'
          onClick={() => {
            if (Array.isArray(file)) {
              setFile((data: any) => data?.filter((v: any) => !v.removed));
            }

            close();
          }}
          mt={20}
        >
          Update
        </Button>
      </Modal>
    </Stack>
  );
};

export default FileUploader;
