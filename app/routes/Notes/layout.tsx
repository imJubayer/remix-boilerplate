import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/layouts/main";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const breadcrumbItems = [{ title: "Notes", link: "/notes" }];

  return (
    // <div className="flex h-full min-h-screen flex-col">
    //   <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
    //     <h1 className="text-3xl font-bold">
    //       <Link to=".">Notes</Link>
    //     </h1>
    //     <p>{user.email}</p>
    //     <Form action="/logout" method="post">
    //       <button
    //         type="submit"
    //         className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
    //       >
    //         Logout
    //       </button>
    //     </Form>
    //   </header>

    //   <main className="flex h-full bg-white">
    //     <div className="h-full w-80 border-r bg-gray-50">
    //       <Link to="new" className="block p-4 text-xl text-blue-500">
    //         + New Note
    //       </Link>

    //       <hr />

    //       {data.noteListItems.length === 0 ? (
    //         <p className="p-4">No notes yet</p>
    //       ) : (
    //         <ol>
    //           {data.noteListItems.map((note) => (
    //             <li key={note.id}>
    //               <NavLink
    //                 className={({ isActive }) =>
    //                   `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
    //                 }
    //                 to={note.id}
    //               >
    //                 📝 {note.title}
    //               </NavLink>
    //             </li>
    //           ))}
    //         </ol>
    //       )}
    //     </div>

    //     <div className="flex-1 p-6">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
    <MainLayout title="Account" breadCrumb={breadcrumbItems}>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
