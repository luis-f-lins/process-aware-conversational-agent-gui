<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol style="text-align: center;">
            <h4 id="traffic" class="card-title" style="margin-top: 15px;">
              About Us
            </h4>
          </CCol>
        </CRow>
        <h6
          style="width: 50%; margin: 20px auto 40px auto; text-align: justify;"
        >
          <p>
            Millions of people execute processes every day. They are important
            for several reasons, including:
          </p>
          <ul>
            <li>
              Regulating a set of procedures in an attempt to unify the
              execution of a task among members of a large team;
            </li>
            <li>
              Facilitating the identification of the most critical tasks on a
              list;
            </li>
            <li>
              Clarifying the dependencies between tasks so that users can
              execute them in the right order;
            </li>
            <li>
              Improving efficiency in task execution, both individually and for
              an entire team, if applicable.
            </li>
          </ul>

          <p>
            This project features conversational agents that were built using
            the Rasa chatbot framework, and Camunda Engine for process instance
            management.
          </p>
          <p>
            At each step of the process, Rasa makes REST API calls to Camunda
            Engine to update the status of the process instance. Meanwhile,
            Camunda will be responsible for making sure the process execution
            follows the right sequences and tracking the current state of the
            process at any given time.
          </p>
        </h6>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {},
};
</script>

<style></style>
