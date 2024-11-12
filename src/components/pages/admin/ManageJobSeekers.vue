    <template>
    <div class="content-wrapper">
        <div class="breadcrumbs text-sm mb-4">
        <ul>
            <li><a>Dashboard</a></li>
            <li><a>Manage Jobseekers</a></li>
        </ul>
        </div>
        <h1 class="text-3xl font-bold text-primary mb-2">Manage Jobseekers</h1>
        <!-- Main content -->

        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card shadow-xl border-t-4 border-t-primary bg-white">
                    <div class="card-body">
                    <div class="flex justify-between">
                        <details class="dropdown">
                        <summary class="btn m-1 bg-slate-200 hover:bg-primaryHover border-none">
                            <i class="fas fa-solid fa-filter"></i>
                        </summary>
                        <ul
                            class="menu dropdown-content rounded-box z-[1] w-52 p-2 shadow bg-white"
                        >
                            <li><a>Fullstack Developer</a></li>
                            <li><a>IT Support</a></li>
                            <li><a>APP Support</a></li>
                        </ul>
                        </details>
                        <h2 class="card-title">Fullstack Developer</h2>
                    </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-header">
                    <div class="card-body">
                        <div role="tablist " class="tabs tabs-lifted bg-white">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            class="tab"
                            aria-label="List"
                            checked="checked"
                        />
                        <div
                            role="tabpanel"
                            class="tab-content border-base-300 rounded-xl p-6 bg-white"
                        >
                            <div class="card-body-sm mt-2">
                            <div class="overflow-x-auto">
                                <table class="table bg-white">
                                <!-- head -->
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>No</th>
                                    <th>Profile</th>
                                    <th>Job Title</th>
                                    <th>Experience</th>
                                    <th>Education</th>
                                    <th>Skills</th>
                                    <th>Certificate</th>
                                    <th>Action</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <!-- row 1 -->
                                    <tr>
                                    <th>
                                        <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox bg-white"
                                        />
                                        </label>
                                    </th>
                                    <td>1</td>
                                    <td>
                                        <div class="flex items-center gap-3 bg-white">
                                        <div class="avatar">
                                            <div
                                            class="mask mask-squircle h-12 w-12 bg-white"
                                            >
                                            <img
                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                            Hart Hagerty
                                            </div>
                                            <div class="text-sm opacity-50">
                                            United Kingdom
                                            </div>
                                        </div>
                                        </div>
                                    </td>
                                    <td>Fullstack Developer</td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >Desktop Support Technician</span
                                        >
                                    </td>
                                    <td>Universitas Negeri London</td>
                                    <td>
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >C#</span
                                        >
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >PHP</span
                                        >
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >Javascript</span
                                        >
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >Makan Banyak</span
                                        >
                                    </td>
                                    <td>
                                        <span class="badge badge-ghost bg-slate-100 text-black border-none"
                                        >TOEFL</span
                                        >
                                    </td>
                                    <td>
                                        <input
                                        type="checkbox"
                                        class="toggle toggle-success bg-white border-none"
                                        />
                                    </td>
                                    <th></th>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            class="tab"
                            aria-label="Accepted"
                        />
                        <div
                            role="tabpanel"
                            class="tab-content border-base-300 rounded-box p-6 bg-white "
                        >
                            Tab content 2
                        </div>
                        </div>
                        <div class="join justify-end">
                        <input
                            class="join-item btn btn-square bg-white hover:bg-gray-400 border-none"
                            type="radio"
                            name="options"
                            aria-label="1"
                            checked="checked"
                        />
                        <input
                            class="join-item btn btn-square bg-white hover:bg-gray-400 border-none"
                            type="radio"
                            name="options"
                            aria-label="2"
                        />
                        </div>
                    </div>
                    <!-- /.card-body -->
                    </div>
                </div>
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
        </section>

        <!-- /.content -->
    </div>
    </template>

    <script>
    export default {
    setup() {
        return {};
    },
    };
    </script>

    <style lang="scss" scoped></style>
