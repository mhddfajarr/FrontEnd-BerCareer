    <template>
    <div class="content-wrapper">
        <div class="breadcrumbs text-sm mb-5">
        <ul>
            <li><a>Dashboard</a></li>
            <li><a>Manage Job Portal</a></li>
        </ul>
        </div>

        <!-- Main content -->
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card bg-white shadow-xl border-t-4 border-t-primary">
                    <!-- /.card-header -->
                    <div class="card-header">
                    <div class="card-body">
                        <div class="flex justify-between">
                        <button
                            type="button"
                            class="btn bg-primary border hover:bg-primaryHover text-white"
                            data-toggle="modal"
                            data-target="#modal-default"
                            data-tooltip="tooltip"
                            data-placement="top"
                            @click="showModal = true"
                        >
                            Add New Job
                        </button>
                        <div class="form-control">
                            <input
                            type="text"
                            placeholder="Search"
                            class="input input-bordered w-24 md:w-auto bg-white"
                            />
                        </div>
                        </div>

                        <div
                        v-if="showModal"
                        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
                        >
                        <!-- Modal Container -->
                        <div
                            class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
                        >
                            <!-- Modal Header -->
                            <div
                            class="flex justify-between items-center border-b pb-3"
                            >
                            <h3 class="text-xl font-semibold">Add New Job</h3>
                            <button
                                @click="showModal = false"
                                class="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body">
                            <form id="quickForm">
                                <div class="card-body">
                                <h4 class="text-lg font-bold mb-2">Title</h4>
                                <input
                                    v-model="newUniversityName"
                                    type="text"
                                    placeholder="Title"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">
                                    Description
                                </h4>
                                <div>
                                    <ejs-richtexteditor
                                    height="200px"
                                    width="525px"
                                    >
                                    <p></p>
                                    </ejs-richtexteditor>
                                </div>
                                <h4 class="text-lg font-bold mb-2">Experience</h4>
                                <input
                                    v-model="newUniversityName"
                                    type="text"
                                    placeholder="Experience"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">Salary</h4>
                                <input
                                    v-model="newUniversityName"
                                    type="text"
                                    placeholder="Salary"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">Location</h4>
                                <input
                                    v-model="newUniversityName"
                                    type="text"
                                    placeholder="Location"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                </div>
                            </form>
                            </div>
                            <!-- Modal Footer -->
                            <div class="mt-6 flex justify-end space-x-4">
                            <button
                                @click="showModal = false"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
                            >
                                Save Changes
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table bg-white text-black">
                        <!-- head -->
                        <thead class="text-black">
                            <tr>
                            <th></th>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Experience</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Total Applicants</th>
                            <th>Action</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr>
                            <th>
                                <label>
                                <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <td>1</td>
                            <td>Fullstack Developer</td>
                            <td>Mampu membuat lautan</td>
                            <td>Minimal pengalaman 69 bulan di bidangnya</td>
                            <td>
                                <span
                                class="badge badge-ghost bg-slate-100 text-black"
                                >Rp. 5,000,000 - Rp. 5,100,000</span
                                >
                            </td>
                            <td>
                                <span
                                class="badge badge-ghost bg-slate-100 text-black"
                                >Jakarta Pusat</span
                                >
                            </td>
                            <td>
                                <span
                                class="badge badge-ghost bg-slate-100 text-black"
                                >100</span
                                >
                            </td>
                            <th></th>
                            </tr>
                        </tbody>
                        </table>
                        <div class="join justify-end">
                        <input
                            class="join-item btn btn-square bg-white hover:bg-gray-400"
                            type="radio"
                            name="options"
                            aria-label="1"
                            checked="checked"
                        />
                        <input
                            class="join-item btn btn-square bg-white hover:bg-gray-400"
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
    import {
    RichTextEditorComponent,
    Toolbar,
    Image,
    HtmlEditor,
    Link,
    Table,
    } from "@syncfusion/ej2-vue-richtexteditor";
    export default {
    components: {
        "ejs-richtexteditor": RichTextEditorComponent,
    },
    provide: {
        richtexteditor: [Toolbar, Image, HtmlEditor, Link, Table],
    },
    data() {
        return {
        showModal: false, // State to control modal visibility
        };
    },
    };
    </script>

    <style>
    @import "/node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-lists/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-popups/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-buttons//styles/material.css";
    @import "/node_modules/@syncfusion/ej2-navigations/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-splitbuttons//styles/material.css";
    @import "/node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
    </style>
