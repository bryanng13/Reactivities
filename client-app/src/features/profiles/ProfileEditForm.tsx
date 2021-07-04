import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {

    const {profileStore: {profile, updateProfile}} = useStore();

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name is a required field')
    })

    return (
        <Formik
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            validationSchema={validationSchema}
            onSubmit={values => {updateProfile(values).then(() => {
                setEditMode(false);
            })}}>
            {({ isValid, isSubmitting, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button
                        disabled={!dirty || !isValid}
                        loading={isSubmitting} 
                        floated='right'
                        positive 
                        type='submit' 
                        content='Update profile' />
                </Form>
            )}
        </Formik>
    )
})