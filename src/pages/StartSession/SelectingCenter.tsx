// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalFooter,
//   ModalBody,
//   Text,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Button,
//   ModalHeader,
//   useDisclosure,
//   Select,
//   GridItem,
//   Box,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import { ChevronDownIcon } from '@chakra-ui/icons';
// import SelectingHeadset from './SelectingHeadset';
// import Joi from 'joi';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import joi from 'joi';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';

// export default function SelectingCenter(props: any) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [centers, setCenters] = useState([]);
//   const [kids, setKids] = useState([]);

//   const [centerId, setCenterId] = useState('1');
//   const [childId, setChildId] = useState('1');
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [selectedChild, setSelectedChild] = useState(null);

//   const selectedCentercontext = useContext(dataContext);

//   const schema = joi.object({
//     Kid: joi.string().required(),
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: joiResolver(schema),
//     mode: 'onTouched',
//   });

//   const getCenters = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/home_centers`,
//         { headers }
//       );
//       setCenters(response.data.data);
//       console.log('response get centes=rs', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const getkids = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/centers/${selectedCentercontext.id}/kids?include=diagnoses,sessions`,
//         { headers }
//       );
//       console.log('response to kids api', response);
//       setKids(response.data.data);
//       console.log('response getkids', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const FormonSubmit = () => {
//     onOpen();
//     props.onClose();
//   };

//   console.log(
//     'selected center context',
//     selectedCentercontext.id ?? 'no selected center id'
//   );
//   useEffect(() => {
//     getCenters();
//     getkids();
//   }, [selectedCentercontext.id]);

//   return (
//     <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           {selectedCentercontext.id ? (
//             <>
//               <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//                 <Text mt="25px">Select a child</Text>

//                 <GridItem>
//                   <Select
//                     {...register('kid')}
//                     id="kid"
//                     name="kid"
//                     placeholder="Select Child"
//                     size="sm"
//                     onChange={(e) => {
//                       console.log('Selected center:', e.target.value);
//                       setSelectedChild(e.target.value);
//                     }}
//                   >
//                     {kids.map((kid) => (
//                       <option value={kid.id} key={kid.id}>
//                         {kid?.attributes.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </GridItem>
//                 {errors.Kid && (
//                   <Text color="red.500">{errors.Kid.message as string}</Text>
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
//                   type="submit"
//                   >
//                   Next
//                 </Button>
//               </ModalFooter>
//             </>
//           ) : (
//             <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
//               You should select a center first from home
//             </ModalHeader>
//           )}
//         </ModalContent>

//         {onOpen && (
//           <SelectingHeadset
//             isOpen={isOpen}
//             onClose={onClose}
//             centerId={centerId}
//             childId={childId}
//           />
//         )}
//       </Modal>
//     </Box>
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
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Button,
//   ModalHeader,
//   useDisclosure,
//   Select,
//   GridItem,
//   Box,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import { ChevronDownIcon } from '@chakra-ui/icons';
// import SelectingHeadset from './SelectingHeadset';
// import Joi from 'joi';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';

// export default function SelectingCenter(props: any) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [centers, setCenters] = useState([]);
//   const [kids, setKids] = useState([]);

//   const [centerId, setCenterId] = useState('1');
//   const [childId, setChildId] = useState('1');
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [selectedChild, setSelectedChild] = useState(null);

//   const selectedCentercontext = useContext(dataContext);

//   const schema = Joi.object({
//     kid: Joi.string().required(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: joiResolver(schema),
//     mode: 'onTouched',
//   });

//   const getCenters = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/home_centers`,
//         { headers }
//       );
//       setCenters(response.data.data);
//       console.log('response get centers', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getkids = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/centers/${selectedCentercontext.id}/kids?include=diagnoses,sessions`,
//         { headers }
//       );
//       console.log('response to kids api', response);
//       setKids(response.data.data);
//       console.log('response getkids', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const FormonSubmit = () => {
//     onOpen();
//     props.onClose();
//   };

//   console.log(
//     'selected center context',
//     selectedCentercontext.id ?? 'no selected center id'
//   );

//   useEffect(() => {
//     getCenters();
//     getkids();
//   }, [selectedCentercontext.id]);

//   return (
//     <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           {selectedCentercontext.id ? (
//             <>
//               <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//                 <Text mt="25px">Select a child</Text>

//                 <GridItem>
//                   <Select
//                     {...register('kid')}
//                     id="kid"
//                     name="kid"
//                     placeholder="Select Child"
//                     size="sm"
//                     onChange={(e) => {
//                       console.log('Selected child:', e.target.value);
//                       setSelectedChild(e.target.value);
//                     }}
//                   >
//                     {kids.map((kid) => (
//                       <option value={kid.id} key={kid.id}>
//                         {kid?.attributes.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </GridItem>
//                 {errors.kid && (
//                   <Text color="red.500">{errors.kid.message as string}</Text>
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
//                   type="submit"
//                 >
//                   Next
//                 </Button>
//               </ModalFooter>
//             </>
//           ) : (
//             <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
//               You should select a center first from home
//             </ModalHeader>
//           )}
//         </ModalContent>

//         {onOpen && (
//           <SelectingHeadset
//             isOpen={isOpen}
//             onClose={onClose}
//             centerId={centerId}
//             childId={childId}
//           />
//         )}
//       </Modal>
//     </Box>
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
//   useDisclosure,
//   Select,
//   GridItem,
//   Box,
// } from '@chakra-ui/react';
// import { config } from '@renderer/config';
// import SelectingHeadset from './SelectingHeadset';
// import Joi from 'joi';
// import axios from 'axios';
// import { dataContext } from '@renderer/shared/Provider';
// import { joiResolver } from '@hookform/resolvers/joi';
// import { useForm } from 'react-hook-form';

// export default function SelectingCenter(props: any) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [centers, setCenters] = useState([]);
//   const [kids, setKids] = useState([]);

//   const [centerId, setCenterId] = useState('1');
//   const [childId, setChildId] = useState('1');
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [selectedChild, setSelectedChild] = useState(null);

//   const selectedCentercontext = useContext(dataContext);

//   const schema = Joi.object({
//     kid: Joi.string().required().messages({
//       'string.empty': 'You must select a child',
//     }),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: joiResolver(schema),
//     mode: 'onTouched',
//   });

//   const getCenters = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/doctors/home_centers`,
//         { headers }
//       );
//       setCenters(response.data.data);
//       console.log('response get centers', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getkids = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     try {
//       const response = await axios.get(
//         `${config.apiURL}/api/v1/centers/${selectedCentercontext.id}/kids?include=diagnoses,sessions`,
//         { headers }
//       );
//       console.log('response to kids api', response);
//       setKids(response.data.data);
//       console.log('response getkids', response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const FormonSubmit = (data: any) => {
//     setChildId(data.kid);
//     onOpen();
//     props.onClose();
//   };

//   console.log(
//     'selected center context',
//     selectedCentercontext.id ?? 'no selected center id'
//   );

//   useEffect(() => {
//     getCenters();
//     getkids();
//   }, [selectedCentercontext.id]);

//   return (
//     <Box as="form" onSubmit={handleSubmit(FormonSubmit)}>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
//           <ModalHeader textAlign="center" fontSize="30px">
//             Start a session
//           </ModalHeader>
//           {selectedCentercontext.id ? (
//             <>
//               <ModalBody fontSize="20px" fontWeight="600" mt="15px">
//                 <Text mt="25px">Select a child</Text>

//                 <GridItem>
//                   <Select
//                     {...register('kid')}
//                     id="kid"
//                     name="kid"
//                     placeholder="Select Child"
//                     size="sm"
//                     onChange={(e) => {
//                       console.log('Selected child:', e.target.value);
//                       setSelectedChild(e.target.value);
//                     }}
//                   >
//                     {kids.map((kid) => (
//                       <option value={kid.id} key={kid.id}>
//                         {kid?.attributes.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </GridItem>
//                 {errors.kid && (
//                   <Text color="red.500">{errors.kid.message as string}</Text>
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
//                   type="submit"
//                 >
//                   Next
//                 </Button>
//               </ModalFooter>
//             </>
//           ) : (
//             <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
//               You should select a center first from home
//             </ModalHeader>
//           )}
//         </ModalContent>
//       </Modal>

//       <SelectingHeadset
//         isOpen={isOpen}
//         onClose={() => {
//           onClose();
//           setChildId(''); // Reset the childId
//         }}
//         centerId={centerId}
//         childId={childId}
//       />
//     </Box>
//   );
// }

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
  Select,
  GridItem,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { config } from '@renderer/config';
import SelectingHeadset from './SelectingHeadset';
import Joi from 'joi';
import axios from 'axios';
import { dataContext } from '@renderer/shared/Provider';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

export default function SelectingCenter(props: any) {
  const { isOpen: isHeadsetOpen, onOpen: onHeadsetOpen, onClose: onHeadsetClose } = useDisclosure();
  const [kids, setKids] = useState([]);
  const [childId, setChildId] = useState('');

  const selectedCentercontext = useContext(dataContext);

  const schema = Joi.object({
    kid: Joi.string().required().messages({
      'string.empty': 'You must select a child',
    }),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const getKids = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `${config.apiURL}/api/v1/centers/${selectedCentercontext.id}/kids?include=diagnoses,sessions`,
        { headers }
      );
      setKids(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted with data: ", data);
    setChildId(data.kid);
    onHeadsetOpen();
    props.onClose();
  };

  useEffect(() => {
    if (selectedCentercontext.id) {
      getKids();
    }
  }, [selectedCentercontext.id]);

  return (
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent h="400px" w="500px" bgColor="#FFFFFF" borderRadius="10px">
          <ModalHeader textAlign="center" fontSize="30px">
            Start a session
          </ModalHeader>
          {selectedCentercontext.id ? (
            <>
              <ModalBody fontSize="20px" fontWeight="600" mt="15px">
                <Text mt="25px">Select a child</Text>
                <GridItem>
                  <Select
                    {...register('kid')}
                    id="kid"
                    name="kid"
                    placeholder="Select Child"
                    size="sm"
                  >
                    {kids.map((kid) => (
                      <option value={kid.id} key={kid.id}>
                        {kid?.attributes.name}
                      </option>
                    ))}
                  </Select>
                </GridItem>
                {errors.kid && (
                  <Text color="red.500">{errors.kid.message as string}</Text>
                )}
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
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          ) : (
            <ModalHeader textAlign="center" fontSize="1.2rem" color="red">
              You should select a center first from home
            </ModalHeader>
          )}
        </ModalContent>
      </Modal>

      <SelectingHeadset
        isOpen={isHeadsetOpen}
        onClose={onHeadsetClose}
        centerId={selectedCentercontext.id}
        childId={childId}
      />
    </Box>
  );
}








{
  /* <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bgColor="#FFFFFF"
              border="2px solid #E1E6EA"
              borderRadius="8px"
              marginTop="10px"
              h="40px"
              w="400px"
            >
              Centers
            </MenuButton>
            <MenuList>
              {centers.map((center) => (
                <MenuItem
                  key={center.id}
                  name="selectedCenter"
                  onClick={() => {
                    setCenterId(center.id);
                    setValues({
                      selectedCenter: center.attributes.name,
                      selectedChild: '',
                    });
                  }}
                >
                  {center.attributes.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */
}

{
  /* <GridItem>
            <Select
              placeholder="Select Center"
              size="sm"
              onChange={(e) => {
                console.log('Selected center:', e.target.value);
                setSelectedCenter(e.target.value);
              }}
            >
              {centers.map((center) => (
                <option value={center.id} key={center.id}>
                  {center?.attributes.name}
                </option>
              ))}
            </Select>
          </GridItem>

          <Text fontSize="10px" color="red">
            {errors.selectedCenter}
          </Text> */
}

// const handleSubmit = async (event: any) => {
//   event.preventDefault();
//   const { error } = schema.validate(values, { abortEarly: false });
//   console.log(error);

//   if (error) {
//     const validationErrors: any = {};
//     error.details.forEach((detail) => {
//       validationErrors[detail.path[0]] = detail.message;
//     });
//     setErrors(validationErrors);
//     console.log(validationErrors);
//   } else {
//     console.log('form is valid');
//     onOpen();
//   }
// };

// const selectChild = async () => {
//   const token = await (window as any).electronAPI.getPassword('token');
//   fetch(`${config.apiURL}/api/v1/centers/${centerId}/kids`, {
//     method: 'Get',
//     redirect: 'follow',
//     headers: { Authorization: `Bearer ${token}` },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       setChildren(result.data);
//     })
//     .catch((error) => console.log('error', error));
// };
