// lib/formSchema.js
const formSchema = [
  {
    step: 1,
    id: "ctl00_ContentPlaceHolder1_txtadharno",
    name: "aadhaarNumber",
    label: "1. Aadhaar Number/ आधार संख्या",
    type: "text",
    placeholder: "Your Aadhaar No",
    required: true,
    maxlength: 12,
    pattern: "^[0-9]{12}$"
  },
  {
    step: 1,
    id: "ctl00_ContentPlaceHolder1_txtownername",
    name: "aadhaarName",
    label: "Name as per Aadhaar",
    type: "text",
    placeholder: "Name as per Aadhaar",
    required: true,
    maxlength: 100
  },
  {
    step: 1,
    id: "ctl00_ContentPlaceHolder1_chkDecarationA",
    name: "declarationA",
    label: "I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।",
    type: "checkbox",
    required: true
  },
  {
    step: 1,
    id: "ctl00_ContentPlaceHolder1_btnValidateAadhaar",
    name: "submitAadhaar",
    label: "Validate & Generate OTP",
    type: "submit"
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_txtPanNo",
    name: "panNumber",
    label: "PAN Number",
    type: "text",
    placeholder: "Enter PAN Number",
    required: true,
    maxlength: 10,
    pattern: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$"
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_txtNameAsPerPan",
    name: "panName",
    label: "Name as per PAN",
    type: "text",
    placeholder: "Name as per PAN",
    required: true,
    maxlength: 100
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_ddlOrgType",
    name: "orgType",
    label: "Type of Organisation",
    type: "select",
    required: true,
    options: [
    { value: "0", label: "Type of Organisation / संगठन के प्रकार", selected: true },
    { value: "1", label: "1. Proprietary / एकल स्वामित्व", selected: false },
    { value: "2", label: "2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)", selected: false },
    { value: "3", label: "3. Partnership / पार्टनरशिप", selected: false },
    { value: "4", label: "4. Co-Operative / सहकारी", selected: false },
    { value: "5", label: "5. Private Limited Company / प्राइवेट लिमिटेड कंपनी", selected: false },
    { value: "6", label: "6. Public Limited Company / पब्लिक लिमिटेड कंपनी", selected: false },
    { value: "7", label: "7. Self Help Group / स्वयं सहायता समूह", selected: false },
    { value: "8", label: "8. Limited Liability Partnership / सीमित दायित्व भागीदारी", selected: false },
    { value: "9", label: "9. Society / सोसाईटी", selected: false },
    { value: "10", label: "10. Trust / ट्रस्ट", selected: false },
    { value: "11", label: "11. Others / अन्य", selected: false }
  ]
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_txtdob",
    name: "dobAsPerPan",
    label: "4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमन तिथि",
    type: "text",
    placeholder: "DD/MM/YYYY",
    required: false,
    pattern: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_chkDecarationP",
    name: "declarationP",
    label: "Declaration acceptance (PAN)",
    type: "checkbox",
    required: true
  },
  {
    step: 2,
    id: "ctl00_ContentPlaceHolder1_btnValidatePAN",
    name: "submitPAN",
    label: "Validate PAN",
    type: "submit"
  },
  {
    step: 3,
    id: "formSubmittedSuccessfully",
    name: "reload",
    label: "Form Submitted Successfully",
    type: "submit"
  }
];

export default formSchema;
