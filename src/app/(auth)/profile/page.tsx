"use client"
import { Button, Card, CloseButton, Form, TextField, FieldError, Input, Label } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client"
import { SyntheticEvent, useState } from "react";


const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const { data: session } = authClient.useSession();

  const user = session?.user;
  console.log(user)
  const handleUpdateProfile = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries());
    await authClient.updateUser({
      ...newUserData
    })
  }
  const handleShow = () => {
    setShow(!show);
  }

  return (

    <div className="mx-auto mt-6 w-full px-3 sm:mt-10 sm:w-[80%] sm:px-0 lg:w-[60%] xl:w-[50%]">
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="image"
            height={200}
            width={300}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Card.Header className="relative gap-1">
            <Card.Title className="break-words pe-8">
              {user?.name}
            </Card.Title>
            <Card.Description className="break-all">
              {user?.email}
            </Card.Description>
            <CloseButton
              aria-label="Close banner"
              className="absolute end-3 top-3"
            />
          </Card.Header>

          <Card.Footer className="mt-auto flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              className="w-full bg-green-600 sm:w-auto"
              onClick={handleShow}
            >
              আপনার প্রোফাইল আপডেট করুন
            </Button>
          </Card.Footer>
        </div>
      </Card>

      <div className="mt-5">
        {show && (
          <Card className="w-full">
            <h1 className="text-xl">তথ্য</h1>

            <Form
              className="flex w-full flex-col gap-4"
              onSubmit={handleUpdateProfile}
            >
              <TextField name="name" type="name">
                <Input placeholder="আপনার সম্পূর্ণ নাম" />
                <FieldError />
              </TextField>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 px-8">
                  আপডেট
                </Button>
              </div>
            </Form>
          </Card>
        )}
      </div>
    </div>

  );
};

export default ProfilePage;