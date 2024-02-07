require_once('../../config.php');
require_once($CFG->dirroot . '/lib/navigationlib.php');

global $PAGE, $OUTPUT;

$PAGE->set_url('/local/calendar_custom/view.php');
$PAGE->set_context(context_system::instance());
$PAGE->set_title('Custom Calendar');
$PAGE->set_heading('Custom Calendar');

echo $OUTPUT->header();

// Your custom calendar content goes here

echo $OUTPUT->footer();
