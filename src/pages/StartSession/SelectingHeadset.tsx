// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalFooter,
//   ModalBody,
//   Text,
//   Button,
//   ModalHeader,
//   GridItem,
//   Select,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import Joi from 'joi';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';

// const ErrorsModal = ({ isOpen, onClose, errorMessages }) => (
//   <Modal isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent>
//       <ModalHeader>Error Details</ModalHeader>
//       <ModalBody>
//         <Text>{errorMessages}</Text>
//       </ModalBody>
//       <ModalFooter>
//         <Button onClick={onClose}>Close</Button>
//       </ModalFooter>
//     </ModalContent>
//   </Modal>
// );

// export default function SelectingHeadset(props) {
//   const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
//   const [headsets, setHeadsets] = useState([]);
//   const selectedCenterContext = useContext(dataContext);
//   const [errorMessages, setErrorMessages] = useState('');

//   const schema = Joi.object({
//     headset: Joi.string().required().messages({
//       'string.empty': 'You must select a headset',
//     }),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: joiResolver(schema),
//     mode: 'onTouched',
//   });

//   const getHeadsets = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = { Authorization: `Bearer ${token}` };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
//         { headers }
//       );
//       setHeadsets(response.data.data);
//     } catch (error) {
//       console.error('Error fetching center headsets:', error);
//       setErrorMessages('Error fetching center headsets');
//       onErrorOpen();
//     }
//   };

//   const handleFormSubmit = (data) => {
//     console.log('Form submitted with data in headset: ', data);
//     setErrorMessages('This is a test error message.');
//     onErrorOpen();
//   };

//   useEffect(() => {
//     if (selectedCenterContext.id) {
//       getHeadsets();
//     }
//   }, [selectedCenterContext.id]);

//   return (
//     <>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           {headsets.length > 0 ? (
//             <>
//               <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//                 <Text mt="25px">Select a headset</Text>
//                 <GridItem>
//                   <Select
//                     {...register('headset')}
//                     id="headset"
//                     name="headset"
//                     placeholder="Select headset"
//                     size="sm"
//                   >
//                     {headsets.map((headset) => (
//                       <option value={headset.id} key={headset.id}>
//                         {headset?.attributes.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </GridItem>
//                 {errors.headset && (
//                   <Text color="red.500">{errors.headset.message as string}</Text>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   w="214px"
//                   h="54px"
//                   bg="#00DEA3"
//                   borderRadius="12px"
//                   color="#FFFFFF"
//                   fontFamily="Roboto"
//                   fontWeight="700"
//                   fontSize="18px"
//                   onClick={handleSubmit(handleFormSubmit)}
//                 >
//                   Connect to headset
//                 </Button>
//               </ModalFooter>
//             </>
//           ) : (
//             // <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
//             //   No VR headsets are available in this center
//             // </ModalHeader>
//             <>
//             <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//                 <Text mt="25px">Select a headset</Text>
//                 <GridItem>
//                   <Select
//                     {...register('headset')}
//                     id="headset"
//                     name="headset"
//                     placeholder="Select headset"
//                     size="sm"
//                   >
//                     {headsets.map((headset) => (
//                       <option value={headset.id} key={headset.id}>
//                         {headset?.attributes.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </GridItem>
//                 {errors.headset && (
//                   <Text color="red.500">{errors.headset.message as string}</Text>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   w="214px"
//                   h="54px"
//                   bg="#00DEA3"
//                   borderRadius="12px"
//                   color="#FFFFFF"
//                   fontFamily="Roboto"
//                   fontWeight="700"
//                   fontSize="18px"
//                   onClick={handleSubmit(handleFormSubmit)}
//                 >
//                   Connect to headset
//                 </Button>
//               </ModalFooter>
//               </>
//           )}
//         </ModalContent>
//       </Modal>

//       <ErrorsModal isOpen={isErrorOpen} onClose={onErrorClose} errorMessages={errorMessages} />
//     </>
//   );
// }


// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalFooter,
//   ModalBody,
//   Text,
//   Button,
//   ModalHeader,
//   GridItem,
//   Select,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import { useForm } from 'react-hook-form';

// const ErrorsModal = ({ isOpen, onClose }) => (


// <Modal isOpen={isOpen} onClose={onClose}>
// <ModalOverlay />
// <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//   <ModalHeader textAlign="center" fontSize="30px">
//     Start a session
//   </ModalHeader>
//   <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//     <Text mt="25px">The selected headset could not be found on this network
// </Text>
  
//   </ModalBody>
//   <ModalFooter>
//     <Button
//       w="214px"
//       h="54px"
//       bg="#00DEA3"
//       borderRadius="12px"
//       color="#FFFFFF"
//       fontFamily="Roboto"
//       fontWeight="700"
//       fontSize="18px"
//     >
//       Cancel sessions
//     </Button>

//     <Button
//       w="214px"
//       h="54px"
//       bg="#00DEA3"
//       borderRadius="12px"
//       color="#FFFFFF"
//       fontFamily="Roboto"
//       fontWeight="700"
//       fontSize="18px"
//     >
//       Select another headset

//     </Button>
//   </ModalFooter>
// </ModalContent>
// </Modal>
// );

// export default function SelectingHeadset(props) {
//   const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
//   const [headsets, setHeadsets] = useState([]);
//   const selectedCenterContext = useContext(dataContext);
//   const [errorMessages, setErrorMessages] = useState('');

//   const getHeadsets = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = { Authorization: `Bearer ${token}` };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
//         { headers }
//       );
//       setHeadsets(response.data.data);
//     } catch (error) {
//       console.error('Error fetching center headsets:', error);
//       setErrorMessages('Error fetching center headsets');
//       onErrorOpen();
//     }
//   };

//   const handleFormSubmit = () => {
//     console.log('Form submitted with data in headset.');
//     setErrorMessages('This is a test error message.');
//     onErrorOpen();
//     // props.onClose();

//   };

//   useEffect(() => {
//     if (selectedCenterContext.id) {
//       getHeadsets();
//     }
//   }, [selectedCenterContext.id]);

//   return (
//     <>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//             <Text mt="25px">Select a headset</Text>
//             <GridItem>
//               <Select
//                 id="headset"
//                 name="headset"
//                 placeholder="Select headset"
//                 size="sm"
//               >
//                 {headsets.map((headset) => (
//                   <option value={headset.id} key={headset.id}>
//                     {headset?.attributes.name}
//                   </option>
//                 ))}
//               </Select>
//             </GridItem>
//           </ModalBody>
//           <ModalFooter>
//             <Button
//               w="214px"
//               h="54px"
//               bg="#00DEA3"
//               borderRadius="12px"
//               color="#FFFFFF"
//               fontFamily="Roboto"
//               fontWeight="700"
//               fontSize="18px"
//               onClick={handleFormSubmit}
//             >
//               Connect to headset
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <ErrorsModal isOpen={isErrorOpen} onClose={onErrorClose} errorMessages={errorMessages} />
//     </>
//   );
// }


// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalFooter,
//   ModalBody,
//   Text,
//   Button,
//   ModalHeader,
//   GridItem,
//   Select,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';



// const ErrorsModal = ({ isOpen, onClose, onSelectAnotherHeadset, onCancelSession }) => {
//   const navigate = useNavigate();

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//         <ModalHeader textAlign="center" fontSize="30px">
//           Start a session
//         </ModalHeader>
//         <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//           <Text mt="25px">The selected headset could not be found on this network</Text>
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             w="214px"
//             h="54px"
//             bg="#00DEA3"
//             borderRadius="12px"
//             color="#FFFFFF"
//             fontFamily="Roboto"
//             fontWeight="700"
//             fontSize="18px"
//             onClick={() => {
//               onCancelSession();
//               navigate('/');
//             }}
//           >
//             Cancel session
//           </Button>
//           <Button
//             w="214px"
//             h="54px"
//             bg="#00DEA3"
//             borderRadius="12px"
//             color="#FFFFFF"
//             fontFamily="Roboto"
//             fontWeight="700"
//             fontSize="18px"
//             onClick={onSelectAnotherHeadset}
//           >
//             Select another headset
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };



// const SelectingHeadset = (props) => {
//   const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
//   const [headsets, setHeadsets] = useState([]);
//   const selectedCenterContext = useContext(dataContext);
//   const [errorMessages, setErrorMessages] = useState('');

//   const getHeadsets = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = { Authorization: `Bearer ${token}` };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
//         { headers }
//       );
//       setHeadsets(response.data.data);
//     } catch (error) {
//       console.error('Error fetching center headsets:', error);
//       setErrorMessages('Error fetching center headsets');
//       onErrorOpen();
//     }
//   };

//   const handleFormSubmit = () => {
//     console.log('Form submitted with data in headset.');
//     setErrorMessages('This is a test error message.');
//     onErrorOpen();
//   };

//   const handleCancelSession = () => {
//     onErrorClose();
//   };

//   const handleSelectAnotherHeadset = () => {
//     onErrorClose();
//     // Additional logic to open the component for selecting another headset
//   };

//   useEffect(() => {
//     if (selectedCenterContext.id) {
//       getHeadsets();
//     }
//   }, [selectedCenterContext.id]);

//   return (
//     <>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//             <Text mt="25px">Select a headset</Text>
//             <GridItem>
//               <Select
//                 id="headset"
//                 name="headset"
//                 placeholder="Select headset"
//                 size="sm"
//               >
//                 {headsets.map((headset) => (
//                   <option value={headset.id} key={headset.id}>
//                     {headset?.attributes.name}
//                   </option>
//                 ))}
//               </Select>
//             </GridItem>
//           </ModalBody>
//           <ModalFooter>
//             <Button
//               w="214px"
//               h="54px"
//               bg="#00DEA3"
//               borderRadius="12px"
//               color="#FFFFFF"
//               fontFamily="Roboto"
//               fontWeight="700"
//               fontSize="18px"
//               onClick={handleFormSubmit}
//             >
//               Connect to headset
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <ErrorsModal
//         isOpen={isErrorOpen}
//         onClose={onErrorClose}
//         onCancelSession={handleCancelSession}
//         onSelectAnotherHeadset={handleSelectAnotherHeadset}
//         errorMessages={errorMessages}
//       />
//     </>
//   );
// }

// export default SelectingHeadset;


import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalHeader,
  GridItem,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ErrorsModal = ({ isOpen, onClose, onSelectAnotherHeadset, onCancelSession }) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
        <ModalHeader textAlign="center" fontSize="30px">
          Start a session
        </ModalHeader>
        <ModalBody fontSize="20px" fontWeight="600" mt="15px">
          <Text mt="25px">The selected headset could not be found on this network</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            w="214px"
            h="54px"
            bg="#00DEA3"
            borderRadius="12px"
            color="#FFFFFF"
            fontFamily="Roboto"
            fontWeight="700"
            fontSize="18px"
            onClick={() => {
              onCancelSession();
              navigate('/');
            }}
          >
            Cancel session
          </Button>
          <Button
            w="214px"
            h="54px"
            bg="#00DEA3"
            borderRadius="12px"
            color="#FFFFFF"
            fontFamily="Roboto"
            fontWeight="700"
            fontSize="18px"
            onClick={onSelectAnotherHeadset}
          >
            Select another headset
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SelectingHeadset = (props) => {
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
  const [headsets, setHeadsets] = useState([]);
  const selectedCenterContext = useContext(dataContext);
  const [errorMessages, setErrorMessages] = useState('');

  const getHeadsets = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/doctors/center_headsets?center_id=${props.centerId}`,
        { headers }
      );
      setHeadsets(response.data.data);
    } catch (error) {
      console.error('Error fetching center headsets:', error);
      setErrorMessages('Error fetching center headsets');
      onErrorOpen();
    }
  };

  const handleFormSubmit = () => {
    console.log('Form submitted with data in headset.');
    setErrorMessages('This is a test error message.');
    onErrorOpen();
  };

  const handleCancelSession = () => {
    onErrorClose();
    props.onClose(); // Close the SelectingHeadset component
  };

  const handleSelectAnotherHeadset = () => {
    onErrorClose();
    // Additional logic to open the component for selecting another headset
  };

  useEffect(() => {
    if (selectedCenterContext.id) {
      getHeadsets();
    }
  }, [selectedCenterContext.id]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          <ModalBody fontSize="20px" fontWeight="600" mt="15px">
            <Text mt="25px">Select a headset</Text>
            <GridItem>
              <Select id="headset" name="headset" placeholder="Select headset" size="sm">
                {headsets.map((headset) => (
                  <option value={headset.id} key={headset.id}>
                    {headset?.attributes.name}
                  </option>
                ))}
              </Select>
            </GridItem>
          </ModalBody>
          <ModalFooter>
            <Button
              w="214px"
              h="54px"
              bg="#00DEA3"
              borderRadius="12px"
              color="#FFFFFF"
              fontFamily="Roboto"
              fontWeight="700"
              fontSize="18px"
              onClick={handleFormSubmit}
            >
              Connect to headset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ErrorsModal
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        onCancelSession={handleCancelSession}
        onSelectAnotherHeadset={handleSelectAnotherHeadset}
        errorMessages={errorMessages}
      />
    </>
  );
};

export default SelectingHeadset;
