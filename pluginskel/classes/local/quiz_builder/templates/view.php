require_once('../../config.php');
require_once($CFG->dirroot . '/lib/navigationlib.php');

global $PAGE, $OUTPUT;

$PAGE->set_url('/local/quiz_builder/view.php');
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Quiz Builder');
$PAGE->set_heading('Quiz Builder');

echo $OUTPUT->header();

// Your custom calendar content goes here

echo $OUTPUT->footer();
