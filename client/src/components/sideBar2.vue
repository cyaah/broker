<template>
  <nav id="sidebar">
    <div class="sidebar-contents">
      <ul class="list-unstyled components">
        <li>
          <i class="fas fa-search fa-lg"></i>
          <router-link to="/">Dashboard</router-link>
        </li>
        <li>
          <i class="fas fa-chart-line fa-lg"></i>
          <router-link to="/portfolio">Portfolio</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "sideBar2"
};
</script>

<style scoped>
$lila: $turbo-yellow /*#7386D5*/;
$lila-60: $turbo-yellow-60 /*#6d7fcc*/;
$lila-line: $turbo-yellow-70 /*#47748b*/;

$text-sidebar: #6b6b6b /*#fff*/;
$text-sidebar-hover: #6b6b6b /*#fff*/;

.text-sidebar {
  color: $text-sidebar;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 142px;
  /* max-width: 112px; */
  /*background: #5A5A5C;*/
  color: white;
  transition: all 0.3s;
  background: #313a3a;
  box-shadow: 3px 1px 3px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: $lila-60 /*#6d7fcc*/;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid $lila-line;
}

#sidebar ul p {
  color: $text-sidebar;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  padding-top: 40px;
  font-size: 15px;
  font-weight: 800;
  color: #fcfffc;
  display: inline-block;
}

#sidebar ul li a:hover {
  color: $lila;
  background: $text-sidebar-hover;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: $text-sidebar;
  background: $lila-60;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: $lila-60;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

i {
  color: whitesmoke;
  padding-left: 4px;
}

a.download {
  background: $text-sidebar;
  color: $lila;
}

a.article,
a.article:hover {
  background: $lila-60 !important;
  color: $text-sidebar !important;
}

.sidebar-contents {
  /*background: yellow;*/
  position: absolute;
  top: 135px;
}
</style>