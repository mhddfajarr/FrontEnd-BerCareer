<template>
  <div class="relative bg-gray-800 text-white h-80 mb-5">
    <img
      src="https://images.pexels.com/photos/6858314/pexels-photo-6858314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Job Seek"
      class="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div class="relative flex flex-col items-center justify-center h-full p-4">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Find Your Dream Job</h1>
      <p class="text-lg px-4 sm:text-xl mb-6">
        Discover countless career opportunities and secure your ideal position.
        Let's grow and thrive together at Berca.
      </p>
      <div class="mb-5 px-6 py-3 text-center">
          <!-- Form content -->
          <div
            class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="text"
              placeholder="Type your dream Role"
              class="w-full sm:w-auto text-gray-500 bg-white px-4 py-2 rounded-xl border-2"
            />
            <select
              class="w-full sm:w-auto bg-white text-gray-500 px-4 py-2 rounded-xl border-2"
            >
              <option>Department</option>
            </select>
            <select
              class="w-full sm:w-auto bg-white text-gray-500 px-4 py-2 rounded-xl border-2"
            >
              <option>Location</option>
            </select>
            <button
              class="w-full sm:w-auto bg-primary text-white px-6 py-2 hover:bg-primaryHover rounded-xl"
            >
              Search
            </button>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 pb-6">
    <!-- Job Card 1 -->
    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

    <routerLink to="Jobs" class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out">
      <div class="flex items-center mb-4">
        <img
          alt="Company logo for Akulaku Indonesia"
          class="w-12 h-12 rounded-full mr-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/cC4UpGmeWyxe0kaPhdaZ5s0pMnHusMzNRRcsfiEEZ1TaxCfOB.jpg"
          width="50"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-700">Area Sales Leader - Ambon</h2>
          <p class="text-gray-600">
            Akulaku Indonesia <i class="fas fa-check-circle text-teal-500"></i>
          </p>
        </div>
      </div>
      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i
          ><span class="text-purple-500">Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>
      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>
      <div class="absolute top-0 right-0 p-2">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>

  
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Tambahkan styling tambahan di sini jika diperlukan */
</style>
