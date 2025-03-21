import axios from 'axios';

const baseUrl = 'http://192.168.100.67:8000/';

const downloadPDFExact = (base64Pdf: any, rName: string) => {
  // Remove the data URL prefix if it exists
  // const base64Data = base64Pdf.split(",")[1];

  const downloadLink = document.createElement('a');
  const fileName = `${rName}`;
  downloadLink.href = base64Pdf?.pdf_url;
  downloadLink.download = fileName;
  downloadLink.click();
};
const uploadFiles = async (formData: any) => {
  // Display the key/value pairs
  // for (var pair of formData.entries()) {
  //     console.log("Pairs",pair[0]+ ', ' + pair[1]);
  // }

  console.log('uploadFiles', formData);

  let url = baseUrl + 'upload-files/';
  //  + `?job_description=${encodeURIComponent(description)}`

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Server Response:', response);

    return response.data;
    // alert('Form Submitted Successfully!');
  } catch (error) {
    console.log('Error submitting form:', error);
    return false;
    // alert('Failed to submit the form. Please try again.');
  }
};

const downLoadResume = async (resumePath: string, rName: string) => {
  try {
    const response = await axios.post(
      resumePath,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('downLoadResume Response:', JSON.stringify(response.data));

    downloadPDFExact(response.data, rName);

    return response.data;
    // alert('Form Submitted Successfully!');
  } catch (error) {
    console.log('Error Getting Resume File', error);
    return false;
    // alert('Failed to submit the form. Please try again.');
  }
};

export { uploadFiles, baseUrl, downLoadResume };
