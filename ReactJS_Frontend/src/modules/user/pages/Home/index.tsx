import { useState } from 'react';
import AuthLayout from '../../../../layout/AuthLayout';
import { Stack, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import classes from './Home.module.css';
import createYupSchema from '../../../../utils/ValidationGeneratorFn';
import FileUploader from '../../../../components/FileUploader/FileUploader';
import { useNavigate } from 'react-router-dom';
import { uploadFiles } from '../../../../apis/allApis';

const Home = () => {
  const validations: any = [
    {
      name: 'description',
      type: 'array',
      validations: {
        minItems: {
          value: 1,
          message: 'Please upload atleast one job description document',
        },
      },
    },

    {
      name: 'resumes',
      type: 'array',
      validations: {
        minItems: { value: 1, message: 'Please upload atleast one resume' },
      },
    },
  ];

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [dataUp, setdataUp] = useState(false);

  const [RespData, setRespData] = useState(null);

  const validationSchema = createYupSchema(validations);

  const form = useForm({
    mode: 'controlled',
    initialValues: { description: [], resumes: [] },

    // functions will be used to validate values at corresponding key
    validate: yupResolver(validationSchema),

    clearInputErrorOnChange: true,
  });

  const handleSubmit = async (values: { description: any; resumes: any }) => {
    setloading(true);
    setdataUp(false);

    const formData = new FormData();

    for (const element of values.description) {
      formData.append('job_description_file', element);
    }

    for (const element of values.resumes) {
      formData.append('files', element);
    }

    let resp_data = await uploadFiles(formData);

    if (resp_data) {
      setRespData(resp_data);
    }

    setloading(false);
  };

  return (
    <>
      <AuthLayout
        header={
          <Stack
            bg={'linear-gradient(to right, #ff7e5f, #feb47b)'}
            pt={20}
            pb={20}
            ps={20}
            pe={20}
            mb={30}
            className={classes.headerCont}
          >
            <Title className={classes.headerTitle} order={1}>
              Resume Score-Card
            </Title>
          </Stack>
        }
      >
        <Stack align='center' justify='center' gap='md' p={'xl'}>
          <Title order={2} c={'var(--mantine-primary-color-light-color)'}>
            🚀 Upload Your Resumes
          </Title>

          <form
            onSubmit={form.onSubmit(handleSubmit)}
            autoComplete='one-time-code'
            autoFocus={true}
          >
            <Stack align='stretch' justify='center' gap='md'>
              <FileUploader
                file={form.values.description}
                setFile={(file: any) => {
                  form.setFieldValue('description', file);
                  setdataUp(true);
                }}
                buttonTitle='Upload Job Description'
                modalTitle='Selected Job Description'
                error={form.errors.description}
                multiple={false}
              />

              <FileUploader
                file={form.values.resumes}
                setFile={(file: any) => {
                  form.setFieldValue('resumes', file);
                  setdataUp(true);
                }}
                modalTitle='Selected Resumes'
                buttonTitle='Upload Resumes'
                error={form.errors.resumes}
              />

              {RespData && !dataUp && (
                <Button
                  variant='filled'
                  color='green'
                  mt='lg'
                  size='md'
                  type='button'
                  fullWidth
                  onClick={() => {
                    navigate('/details', { state: { data: RespData } });
                  }}
                >
                  Check Score Result
                </Button>
              )}

              <Button
                data-testid='submit-btn-login'
                mt='lg'
                size='md'
                type='submit'
                fullWidth
                loading={loading}
                disabled={
                  form.values.description.length === 0 ||
                  form.values.resumes.length === 0 ||
                  Object.values(form.errors).length > 0 ||
                  !dataUp
                }
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </AuthLayout>
    </>
  );
};

export default Home;
